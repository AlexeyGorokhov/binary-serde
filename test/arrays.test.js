'use strict';

const test = require('tape');

const {
  encode,
  decode,
  stringToBuffer,
  bufferToString
} = require('../');

const getArray = len => Array(len).fill(1);

const cases = [
  ['fixarray > min', []],
  ['fixarray > max', getArray(15)],
  ['fixarray > in-range', getArray(2)],
  ['array16 > min', getArray(16)],
  ['array16 > max', getArray((2 ** 16) - 1)],
  ['array16 > in-range', getArray(30)]
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

test('array is too large', t => {
  const value = getArray(2 ** 16);

  try {
    encode(value);

    t.end('expected to throw');
  } catch {
    t.equals(true, true);
    t.end();
  }
});
