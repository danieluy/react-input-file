# ds-react-input-file
React component to handle file uploads with drag and drop support.  
This is an in-progress project that will grow with my needs, but if you have any sugestions or requests I'm listening.:wink:

## [Live demo](https://danieluy.github.io/react-input-file/)

## Usage
```javascript
import React, { Component, Fragment } from 'react';
import InputFile from 'ds-react-input-file';

class App extends Component {
  render() {
    return (
      <Fragment>
        {/* Without children */}
        <InputFile
          onComplete={result => console.log(result)}
        />
        {/* With children */}
        <InputFile>
          <button>Button</button>
        </InputFile>
      </Fragment>
    );
  }
}
```

## API
| Attribute   | Type                                                           | Behavior                                                                                                         | Default                         | Mandatory |
| :-          | :-                                                             | :-                                                                                                               | :-                              | :-        |
| children    | ``React Element``                                              | Gets drawn instead of the default button view                                                                    | ``undefined``                   | ``false`` |
| onComplete  | ``Function``                                                   | Called with ``Any`` when upload completes                                                                        | -                               | ``true``  |
| onError     | ``Function``                                                   | Called with ``Error`` when fail                                                                                  | ``(err) => console.error(err)`` | ``false`` |
| multiple    | ``Boolean``                                                    | Allows multi-selection and forces ``onComplete`` to return an ``Array``                                          | ``false``                       | ``false`` |
| noDrop      | ``Boolean``                                                    | Disables drag and drop support                                                                                   | ``false``                       | ``false`` |
| readAs      | ``Enum['TEXT', 'DATA_URL', 'BINARY_STRING', 'ARRAY_BUFFER']``  | Sets the read mode of ``FileReader`` [[+]](https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Methods)  | 'TEXT'                          | ``false`` |
| output      | ``Enum['ANY', 'JSON']``                                        | Formats the result                                                                                               | 'ANY'                           | ``false`` |

## Changelog
### v0.2.0
- Added drag and drop support
### v0.1.1
- Removed dependencies
### v0.1.0
- Basic functionality