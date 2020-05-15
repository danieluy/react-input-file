import React, { PureComponent, Fragment } from 'react';
import InputFile, { ACCEPT } from './InputFile/InputFile';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/styles/prism';

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      progress: {
        porcentage: 0,
        bits: 0,
      },
    };
  }

  render() {
    return (
      <Fragment>
        <Card>
          <Title>Basic usage</Title>
          <InputFile
            onComplete={result => console.log(result)}
          />
          <Pre>{getPre('BASIC_USAGE')}</Pre>
        </Card>

        <Card>
          <Title>Format output</Title>
          <InputFile
            onComplete={result => console.log(result)}
            output="JSON"
          />
          <Pre>{getPre('FORMAT_OUTPUT')}</Pre>
        </Card>

        <Card>
          <Title>Limit input types</Title>
          <Paragraph>ACCEPT provides helpers for json, images, video and audio.</Paragraph>
          <Paragraph>If you require something more specific you can also use any extension (e.g .docx for MS Word Documents), or even any valid mime-type.</Paragraph>
          <InputFile
            onComplete={result => console.log(result)}
            accept={[
              ACCEPT.IMAGE,
              ACCEPT.AUDIO,
              'application/msword',
              '.txt',
            ]}
          />
          <Pre>{getPre('LIMIT_INPUT_TYPES')}</Pre>
        </Card>

        <Card>
          <Title>Progress handler</Title>
          <InputFile
            onComplete={result => console.log(result)}
            onProgress={progress => this.setState({ progress })}
          />
          <div style={{
            height: 20,
            backgroundColor: '#E62264',
            width: `${this.state.progress.porcentage}%`,
            fontFamily: 'sans-serif',
            borderRadius: 10,
            marginBottom: 20,
          }}
          >
            <p style={{
              width: '100%',
              color: '#FFF',
              textAlign: 'center',
              lineHeight: '20px',
            }}
            >
              {`${this.state.progress.bits} Bits`}
            </p>
          </div>
          <Pre>{getPre('PROGRESS_HANLDER')}</Pre>
        </Card>

        <Card>
          <Title>With children</Title>
          <InputFile onComplete={result => console.log(result)}>
            <button
              style={{
                color: '#E62264',
                backgroundColor: '#FFF',
                border: '2px solid #E62264',
                borderRadius: 5,
                padding: 10,
                textTransform: 'uppercase',
                cursor: 'inherit',
                display: 'inline-block',
                fontFamily: 'sans-serif',
                textAlign: 'center',
              }}
            >
              Custom button
            </button>
          </InputFile>
          <Pre>{getPre('WITH_CHILDREN')}</Pre>
          <InputFile onComplete={result => console.log(result)} noClick multiple>
            <div
              style={{
                color: '#E62264',
                backgroundColor: '#FFF',
                border: '2px dotted #E62264',
                borderRadius: 20,
                padding: 20,
                fontFamily: 'sans-serif',
                textAlign: 'center',
              }}
            >
              Drop files here.
            </div>
          </InputFile>
          <Pre>{getPre('WITH_CHILDREN_DROP')}</Pre>
        </Card>
      </Fragment>
    );
  }
}

export default App;

function getPre(pre) {
  switch (pre) {
    case 'BASIC_USAGE':
      return '<InputFile onComplete={result => console.log(result)} />';
    case 'FORMAT_OUTPUT':
      return `<InputFile
  onComplete={result => console.log(result)}
  output="JSON"
/>`;
    case 'LIMIT_INPUT_TYPES':
      return `import InputFile, { ACCEPT } from 'ds-react-input-file';
// ...
<InputFile
  onComplete={result => console.log(result)}
  accepts={[
    ACCEPT.IMAGE,
    ACCEPT.AUDIO,
    'application/msword',
    '.txt',
  ]}
/>`;
    case 'WITH_CHILDREN':
      return `<InputFile onComplete={result => console.log(result)}>
    <div
      style={{
        color: '#E62264',
        backgroundColor: '#FFF',
        border: '2px solid #E62264',
        borderRadius: 5,
        padding: 10,
        textTransform: 'uppercase',
        cursor: 'inherit',
        display: 'inline-block',
        fontFamily: 'sans-serif',
        textAlign: 'center',
      }}
    >
      Custom button
    </div>
</InputFile>`;
    case 'WITH_CHILDREN_DROP':
      return `<InputFile onComplete={result => console.log(result)} noClick multiple>
  <div
    style={{
      color: '#E62264',
      backgroundColor: '#FFF',
      border: '2px dotted #E62264',
      borderRadius: 20,
      padding: 20,
      fontFamily: 'sans-serif',
      textAlign: 'center',
    }}
  >
    Drop files here
  </div>
</InputFile>`;
    case 'PROGRESS_HANLDER':
      return `<InputFile
  onComplete={result => console.log(result)}
  onProgress={progress => this.setState({ progress })}
/>
<div style={{
  height: 20,
  backgroundColor: '#E62264',
  width: \`\${this.state.progress.porcentage}%\`,
  fontFamily: 'sans-serif',
  borderRadius: 10,
  marginBottom: 20,
}}
>
  <p style={{
    width: '100%',
    color: '#FFF',
    textAlign: 'center',
    lineHeight: '20px',
  }}
  >
    {\`\${this.state.progress.bits} Bits\`}
  </p>
</div>`;
    default:
      break;
  }
}

class Pre extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <SyntaxHighlighter language="javascript" style={darcula}>
        {children}
      </SyntaxHighlighter>
    );
  }
}

function Title({ children }) {
  return (
    <h1 style={{
      fontFamily: 'sans-serif',
      color: '#555',
      margin: '10px 0 20px 0',
    }}
    >
      {children}
    </h1>
  );
}

function Paragraph({ children }) {
  return (
    <p style={{
      fontFamily: 'sans-serif',
      color: '#555',
      margin: '5px 0 10px 0',
    }}
    >
      {children}
    </p>
  );
}

const Card = ({ children }) => (
  <div style={{
    backgroundColor: '#FFF',
    boxShadow: '0 5px 10px 0 #BBB',
    padding: 10,
    borderRadius: 5,
    minWidth: 800,
    width: '50%',
    margin: '0 auto 20px auto',
  }}
  >
    {children}
  </div>
);
