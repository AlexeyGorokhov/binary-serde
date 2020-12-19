'use strict';

const {
  encode,
  decode,
  bufferToString,
  stringToBuffer
} = require('../src');

const data = 1;

console.log('\nInitial value:');
console.log(data);

const encodedBinData = encode(data);
console.log('\nEncoded buffer:');
console.log(encodedBinData);

const encodedStr = bufferToString(encodedBinData);
console.log('\nSerialized HEX string:');
console.log(encodedStr);

const result = stringToBuffer(encodedStr);
console.log('\nBuffer deserialized from HEX string:');
console.log(result);

const a = decode(result);
console.log('\nDecoded data:');
console.log(a);
