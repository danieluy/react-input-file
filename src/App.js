import React, { PureComponent, Fragment } from 'react';
import InputFile from './InputFile/InputFile';
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
          <Title>Explicit output type</Title>
          <InputFile
            onComplete={result => console.log(result)}
            output="JSON"
          />
          <Pre>{getPre('EXPLICIT_OUTPUT_TYPE')}</Pre>
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
              }}
            >
              Custom button
            </button>
          </InputFile>
          <Pre>{getPre('WITH_CHILDREN')}</Pre>
          <InputFile onComplete={result => console.log(result)}>
            <div
              style={{
                color: '#E6226488',
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
    case 'EXPLICIT_OUTPUT_TYPE':
      return `<InputFile
  onComplete={result => console.log(result)}
  output="JSON"
/>`;
    case 'WITH_CHILDREN':
      return `<InputFile onComplete={result => console.log(result)}>
  <button
    style={{
      color: '#E62264',
      backgroundColor: '#FFF',
      border: '2px solid #E62264',
      borderRadius: 5,
      padding: 10,
      textTransform: 'uppercase',
      cursor: 'inherit',
    }}
  >
    Custom button
  </button>
</InputFile>`;
    case 'WITH_CHILDREN_DROP':
      return `<InputFile onComplete={result => console.log(result)}>
  <div
    style={{
      color: '#E6226488',
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
