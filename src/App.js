import React, { PureComponent, Fragment } from 'react';
import InputFile from './InputFile/InputFile';

class App extends PureComponent {
  render() {
    return (
      <Fragment>
        <Pre>
          {getPre(1)}
        </Pre>
        <InputFile
          onComplete={result => console.log(result)}
        />
        <Pre>
          {getPre(2)}
        </Pre>
        <InputFile
          onComplete={result => console.log(result)}
          output="JSON"
        />
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
    default:
      break;
  }
}

const Pre = ({ children }) => (
  <pre style={{ background: '#555', padding: '1em', color: '#EEE', fontFamily: 'monospace, consolas' }}>
    {children}
  </pre>
);
