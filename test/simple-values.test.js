'use strict';

const test = require('tape');

const {
  encode,
  decode,
  stringToBuffer,
  bufferToString
} = require('../');

const getString = len => ('a').repeat(len);

const cases = [
  ['null', null],
  ['false', false],
  ['true', true],
  ['positivefixnum > min', 0],
  ['positivefixnum > max', 127],
  ['positivefixnum > in-range', 120],
  ['negativefixnum > min', -31],
  ['negativefixnum > max', -1],
  ['negativefixnum > in-range', -15],
  ['uint8 > min', 128],
  ['uint8 > max', 255],
  ['uint8 > in-range', 205],
  ['uint16 > min', 256],
  ['uint16 > max', (2 ** 16) - 1],
  ['uint16 > in-range', (2 ** 16) - 1234],
  ['uint32 > min', 2 ** 16],
  ['uint32 > max', (2 ** 32) - 1],
  ['uint32 > in-range', (2 ** 32) - 1234],
  ['uint64 > min', 2 ** 32],
  ['uint64 > max', Number.MAX_SAFE_INTEGER],
  ['uint64 > in-range', Number.MAX_SAFE_INTEGER - 1234],
  ['int8 > min', -127],
  ['int8 > max', -32],
  ['int8 > in-range', -100],
  ['int16 > min', -(2 ** (16 - 1))],
  ['int16 > max', -128],
  ['int16 > in-range', -(2 ** (16 - 1)) + 1234],
  ['int32 > min', -(2 ** (32 - 1))],
  ['int32 > max', -(2 ** (16 - 1)) - 1],
  ['int32 > in-range', -(2 ** (32 - 1)) + 1234],
  ['int64 > min', Number.MIN_SAFE_INTEGER],
  ['int64 > max', -(2 ** (32 - 1)) - 1],
  ['int64 > in-range', Number.MIN_SAFE_INTEGER + 1234],
  ['float64 > 0.00001', 0.00001],
  ['float64 > -0.00001', -0.00001],
  ['float64 > 1253.242354', 1253.242354],
  ['float64 > -1253.242354', -1253.242354],
  ['fixstr > empty string', ''],
  ['fixstr > max', getString(31)],
  ['fixstr > in-range', getString(28)],
  ['str8 > min', getString(32)],
  ['str8 > max', getString((2 ** 8) - 1)],
  ['str8 > in-range', getString(35)],
  ['str16 > min', getString(2 ** 8)],
  ['str16 > max', getString((2 ** 16) - 1)],
  ['str16 > in-range', getString((2 ** 8) + 1234)]
];

for (const c of cases) {
  const [valueType, value] = c;

  test(`${valueType}`, t => {
    const encodedBinData = encode(value);
    const encodedStr = bufferToString(encodedBinData);
    const decodedBinData = stringToBuffer(encodedStr);
    const result = decode(decodedBinData);

    t.equal(result, value);

    t.end();
  });
}

test('integer is too small', t => {
  const value = Number.MIN_SAFE_INTEGER - 1;

  try {
    encode(value);

    t.end('expected to throw');
  } catch {
    t.equals(true, true);
    t.end();
  }
});

test('integer is too large', t => {
  const value = Number.MAX_SAFE_INTEGER + 1;

  try {
    encode(value);

    t.end('expected to throw');
  } catch {
    t.equals(true, true);
    t.end();
  }
});

test('string is too large', t => {
  const value = getString(2 ** 16);

  try {
    encode(value);

    t.end('expected to throw');
  } catch {
    t.equals(true, true);
    t.end();
  }
});

test('undefined', t => {
  const encodedBinData = encode(undefined);
  const encodedStr = bufferToString(encodedBinData);
  const decodedBinData = stringToBuffer(encodedStr);
  const result = decode(decodedBinData);

  t.equal(result, null, 'should serialize to null');

  t.end();
});
