'use strict';

const test = require('tape');

const {
  encode,
  decode,
  stringToBuffer,
  bufferToString
} = require('../');

const getMap = len => {
  const map = {};
  for (let i = 0; i < len; i += 1) {
    map[`prop${i}`] = 'foo';
  }
  return map;
};

const cases = [
  ['fixmap > min', {}],
  ['fixmap > max', getMap(15)],
  ['fixmap > in-range', getMap(2)],
  ['map16 > min', getMap(16)],
  ['map16 > max', getMap((2 ** 16) - 1)],
  ['map16 > in-range', getMap(30)]
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

test('map is too large', t => {
  const value = getMap(2 ** 16);

  try {
    encode(value);

    t.end('expected to throw');
  } catch {
    t.equals(true, true);
    t.end();
  }
});
