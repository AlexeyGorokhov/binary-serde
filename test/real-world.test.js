'use strict';

const test = require('tape');

const {
  encode,
  decode,
  stringToBuffer,
  bufferToString
} = require('../src/index');

const cases = [
  ['complex', require('./data/complex.json')]
];

for (const c of cases) {
  const [valueType, value] = c;

  test(`${valueType}`, t => {
    const encodedBinData = encode(value);
    const encodedStr = bufferToString(encodedBinData);
    const decodedBinData = stringToBuffer(encodedStr);
    const result = decode(decodedBinData);

    t.deepEqual(result, value);

    t.end();
  });
}
