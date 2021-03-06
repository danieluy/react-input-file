# ds-react-input-file
React component to handle file uploads with drag and drop support.  
This is an in-progress project that will grow with my needs, but if you have any sugestions or requests I'm listening.:wink:

## [Live demo with samples](https://danieluy.github.io/react-input-file/)

## Usage
```javascript
import React, { Component } from 'react';
import InputFile from 'ds-react-input-file';

class App extends Component {
  render() {
    return (
        <InputFile onComplete={result => console.log(result)} />
    );
  }
}
```

## API
| Attribute   | Type                                                                      | Behavior                                                                                                                                             | Default                          | Mandatory |
| :-          | :-                                                                        | :-                                                                                                                                                   | :-                               | :-        |
| children    | ``React Element``                                                         | Gets drawn instead of the default button view                                                                                                        | ``undefined``                    | ``false`` |
| onComplete  | ``Function``                                                              | Called with ``Any`` when upload completes                                                                                                            | -                                | ``true``  |
| onProgress  | ``Function``                                                              | Called with ``Object`` when upload status changes (Shape == { porcentage:``Integer``, bits:``Integer`` })                                            | -                                | ``false`` |
| onError     | ``Function``                                                              | Called with ``Error`` when fail                                                                                                                      | ``(err) => { // hande error } `` | ``false`` |
| multiple    | ``Boolean``                                                               | Allows multi-selection and forces ``onComplete`` to return an ``Array``                                                                              | ``false``                        | ``false`` |
| noDrop      | ``Boolean``                                                               | Disables drag and drop support                                                                                                                       | ``false``                        | ``false`` |
| noClick     | ``Boolean``                                                               | Disables click support                                                                                                                               | ``false``                        | ``false`` |
| readAs      | ``Enum['TEXT', 'DATA_URL', 'BINARY_STRING', 'ARRAY_BUFFER', 'NO_READ']``  | Sets the [read mode of FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader#Methods). `NO_READ` returns raw input.                | 'TEXT'                           | ``false`` |
| output      | ``Enum['JSON']``                                                          | Formats the result                                                                                                                                   | -                                | ``false`` |
| accept      | ``ACCEPT helpers, extension name or mime-type``                           | Limits input types. For ACCEPT helpers see [Live demo with samples](https://danieluy.github.io/react-input-file/)                                    | -                                | ``false`` |

## Changelog
### v0.8.0
- Added accessibility support
- Added support for custom label
- Improved examples
### v0.7.2
- Fixed a typo in docs
- Fixed samples page title
### v0.7.1
- Fixed docs
### v0.7.0
- Added accept support to limit input types
### v0.6.0
- Changed output default and options
- Removed default error handling function
### v0.5.1
- Fixed a bug that was preventing some children from being clicked
### v0.5.0
- Added option to disable file read
### v0.4.0
- Added option to disable click support
### v0.3.0
- Added progress handler
### v0.2.0
- Added drag and drop support
### v0.1.1
- Removed dependencies
### v0.1.0
- Basic functionality