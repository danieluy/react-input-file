import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './styles';
import outputs from './outputs';

class InputFile extends PureComponent {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.output = this.output.bind(this);
  }

  onChange(evt) {
    const { onComplete, multiple, output, onError } = this.props;
    const files = Array.from(evt.target.files).filter((file) => {
      if (output === 'ANY')
        return true;
      return file.type === outputs[output].mimeType;
    });
    if (files.length)
      Promise.all(files.map(file => this.readFile(file)))
        .then(results => this.output(results))
        .catch(err => onError(err));
    else
      onComplete(multiple ? [] : null);
  }

  // TODO make it DRY
  onDrop(evt) {
    evt.preventDefault();
    const { onComplete, multiple, output, onError } = this.props;
    const files = Array.from(evt.dataTransfer.files).filter((file) => {
      if (output === 'ANY')
        return true;
      return file.type === outputs[output].mimeType;
    });
    if (files.length)
      Promise.all(files.map(file => this.readFile(file)))
        .then(results => this.output(results))
        .catch(err => onError(err));
    else
      onComplete(multiple ? [] : null);
  }

  onDragOver(evt) {
    evt.preventDefault();
  }

  output(results) {
    const { onComplete, multiple, output, onError } = this.props;
    try {
      const out = results.map(file => outputs[output].transform(file));
      onComplete(multiple ? out : (out[0] || null));
    }
    catch (err) {
      onError(err);
    }
  }

  readFile(file) {
    const { readAs, onProgress } = this.props;
    if (readAs === 'NO_READ')
      return Promise.resolve(file);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        resolve(evt.target.result);
      };
      reader.onerror = (evt) => {
        reader.abort();
        reject(new Error('Error loading file.'));
      };
      reader.onprogress = (evt) => {
        onProgress({
          porcentage: evt.lengthComputable ? Math.round((evt.loaded / evt.total) * 100) : 0,
          bits: evt.loaded,
        });
      };
      switch (readAs) {
        case 'ARRAY_BUFFER':
          reader.readAsArrayBuffer(file);
          break;
        case 'BINARY_STRING':
          reader.readAsBinaryString(file);
          break;
        case 'DATA_URL':
          reader.readAsDataURL(file);
          break;
        default:
          reader.readAsText(file);
          break;
      }
    });
  }

  render() {
    const { multiple, children, output, noDrop, noClick } = this.props;
    const id = Math.random();
    const label = multiple ? 'Upload files' : 'Upload file';
    const accept = output !== 'ANY'
      ? outputs[output].accept
      : undefined;

    return (
      <label
        htmlFor={id}
        aria-label={label}
        style={style.button({ children, noClick })}
        onDragOver={!noDrop ? this.onDragOver : null}
        onDrop={!noDrop ? this.onDrop : null}
        onClick={evt => noClick && evt.preventDefault()}
      >
        {children || label}
        <input
          id={id}
          type="file"
          multiple={multiple}
          style={style.input()}
          onChange={this.onChange}
          accept={accept}
        />
      </label>
    );
  }
}

InputFile.propTypes = {
  multiple: PropTypes.bool,
  children: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  onProgress: PropTypes.func,
  onError: PropTypes.func,
  output: PropTypes.oneOf(['ANY', 'JSON', 'IMG']),
  readAs: PropTypes.oneOf(['TEXT', 'DATA_URL', 'BINARY_STRING', 'ARRAY_BUFFER']),
  noDrop: PropTypes.bool,
  noClick: PropTypes.bool,
};

InputFile.defaultProps = {
  multiple: false,
  children: null,
  output: 'ANY',
  readAs: 'TEXT',
  noDrop: false,
  noClick: false,
  onError: () => 0,
  onProgress: () => 0,
};

export default InputFile;
