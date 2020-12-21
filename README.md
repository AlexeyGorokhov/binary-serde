# binary-serde

Binary Javascript serializer/deserializer based on [MessagePack](https://msgpack.org).

`binary-serde` has no dependencies, and uses TypedArrays internally that makes it work interchangeably both in Node.js and in browser.

_Important!_ This is NOT a full MessagePack implementation. The main motivation backing `binary-serde` is replacement of JSON.stringify/parse which cause weird problems in some scenarios (e.g., serialization/deserialization of Redux state in SSR React applications).


## Implementation Details and Limitations

`binary-serde` has the following limitations:

* Maximum length of a stirng in UTF-8 bytes is (2^16 - 1).

* Maximum length of an array is (2^16 - 1).

* Maximum number of top-level properties of an object is (2^16 - 1).


### Floating point numbers

`binary-serde` uses `float 64` format for all floating point numbers. `float 32` format is not implemented.


### Dates

While encoding, `binary-serde` converts `Date` objects into strings using `Date.prototype.toISOString()`. On decode, these strings remain strings in ISO format.


### MessgePack Extensions

Extensions are not implemented.




## Installation

```bash
$ npm install --save binary-serde
```



## Usage Examples

### Node.js

```javascript
const {
  encode,
  decode,
  bufferToString,
  stringToBuffer
} = require('binary-serde');

const data = {/* */};

const encodedBinData = encode(data);

// encodedBinData is an Uint8Array. Do whatever you want with it.
// E.g., serialize it into a HEX-encoded string using bufferToString utility
// provided by binary-serde

const encodedStr = bufferToString(encodedBinData);

// Then you might want to deserialize this string back into Uint8Array.
// Use stringToBuffer utility provided by binary-serde

const decodedBinData = stringToBuffer(encodedStr);

// Finaly decode this Uint8Array back into JS value
const decodedData = decode(decodedBinData);
```

### Using in Browser

If you do care about size of javascript bundle served to the client and use only a part of `binary-serde`'s functionality in your client code, `binary-serde` provides atomic exports of its functions:

```javascript
import encode from 'binary-serde/browser/encode';
import decode from 'binary-serde/browser/decode';
import bufferToString from 'binary-serde/browser/buffer-to-string';
import stringToBuffer from 'binary-serde/browser/string-to-buffer';
```

*Note.* `binary-serde` exposes CommonJS modules. Hence, you'll need a build tool, such as Webpack, to use `binary-serde` in browser code.




## API Reference

### encode(data)

Encode any `JSON.stringify`-able javascript value into an Uint8Array.

`data {Any}` - any `JSON.stringify`-able javascript value.

Returns `{Uint8Array}`.


### decode(buff)

Decode Uint8Array back into javascript value.

`buff {Uint8Array}` - Binary data encoded with `binary-serde`.

Returns `{Any}` - decoded javascript value.


### bufferToString(buff)

Utility function to serialize an Uint8Array into a HEX-encoded string.

`buff {Uint8Array}`

Returns `{String}`.


### stringToBuffer(str)

Utility function to deserialize a HEX-encoded string into an Uint8Array.

`str {String}` - HEX-encoded string.

Returns `{Uint8Array}`.
