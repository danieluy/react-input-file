import React, { PureComponent, Fragment } from 'react';
import InputFile from './InputFile/InputFile';

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Title>Basic usage</Title>
        <Pre>
          {getPre(1)}
        </Pre>
        <InputFile
          onComplete={result => console.log(result)}
        />

        <Title>Explicit output type</Title>
        <Pre>
          {getPre(2)}
        </Pre>
        <InputFile
          onComplete={result => console.log(result)}
          output="JSON"
        />

        <Title>With children</Title>
        <Pre>
          {getPre(3)}
        </Pre>
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

        <Pre>
          {getPre(4)}
        </Pre>
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
      </Fragment>
    );
  }
}

export default App;

function getPre(pre) {
  switch (pre) {
    case 1:
      return `<InputFile
  onComplete={result => console.log(result)}
/>`;
    case 2:
      return `<InputFile
  onComplete={result => console.log(result)}
  output="JSON"
/>`;
    case 3:
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
    case 4:
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
    default:
      break;
  }
}

const Pre = ({ children }) => (
  <pre style={{ background: '#EEE', padding: '1em', color: '#555', fontFamily: 'monospace, consolas' }}>
    {children}
  </pre>
);

function Title({ children }) {
  return (
    <h3 style={{ fontFamily: 'sans-serif', color: '#555', marginTop: 35 }}>{children}</h3>
  );
}
