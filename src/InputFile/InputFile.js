import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import outputs from './outputs';
import _accept from './accept';

class InputFile extends PureComponent {
  constructor() {
    super();
    this.state = {};
    this.inputRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.output = this.output.bind(this);
    this.withOptions = this.childrenWithEvents.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderInputFile = this.renderInputFile.bind(this);
  }

  onChange(evt) {
    const { onComplete, multiple, output, onError } = this.props;
    const files = Array.from(evt.target.files).filter((file) => {
      if (output && outputs[output])
        return file.type === outputs[output].mimeType;
      return true;
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
      if (output && outputs[output])
        return file.type === outputs[output].mimeType;
      return true;
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
      let out = results;
      if (output && outputs[output])
        out = results.map(file => outputs[output].transform(file));
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

  handleClick(evt) {
    const { noClick } = this.props;
    if (noClick) return;
    evt.preventDefault();
    this.inputRef.current.click();
  }

  childrenWithEvents() {
    const { children, noDrop } = this.props;
    return React.cloneElement(children, {
      onDragOver: !noDrop ? this.onDragOver : null,
      onDrop: !noDrop ? this.onDrop : null,
      onClick: this.handleClick,
    });
  }

  renderInputFile() {
    const { multiple, accept } = this.props;
    const strAccept = accept.length ? accept.join(',') : undefined;

    return (
      <input
        type="file"
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={this.onChange}
        accept={strAccept}
        ref={this.inputRef}
      />
    );
  }

  getLabel(multiple) {
    return multiple ? 'Upload files' : 'Upload file';
  }

  render() {
    const { multiple, children, noDrop } = this.props;
    const label = this.getLabel(multiple);

    if (children && typeof children !== 'string')
      return (
        <React.Fragment>
          {this.childrenWithEvents()}
          {this.renderInputFile()}
        </React.Fragment>
      );

    return (
      <React.Fragment>
        <button
          aria-label={children || label}
          onDragOver={!noDrop ? this.onDragOver : null}
          onDrop={!noDrop ? this.onDrop : null}
          onClick={this.handleClick}
        >
          {children || label}
        </button>
        {this.renderInputFile()}
      </React.Fragment>
    );
  }
}

InputFile.propTypes = {
  multiple: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  onComplete: PropTypes.func.isRequired,
  onProgress: PropTypes.func,
  onError: PropTypes.func,
  output: PropTypes.oneOf(Object.keys(outputs)),
  accept: PropTypes.arrayOf(PropTypes.string),
  readAs: PropTypes.oneOf(['TEXT', 'DATA_URL', 'BINARY_STRING', 'ARRAY_BUFFER', 'NO_READ']),
  noDrop: PropTypes.bool,
  noClick: PropTypes.bool,
};

InputFile.defaultProps = {
  multiple: false,
  children: null,
  output: null,
  accept: [],
  readAs: 'TEXT',
  noDrop: false,
  noClick: false,
  onError: () => 0,
  onProgress: () => 0,
};

export default InputFile;

export const ACCEPT = _accept;
