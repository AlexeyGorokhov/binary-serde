'use strict';

const test = require('tape');

const {
  encode,
  decode,
  stringToBuffer,
  bufferToString
} = require('../src/index');

test('date', t => {
  const ISOString = '2020-12-20T10:45:12.000Z';
  const value = new Date(ISOString);
  const encodedBinData = encode(value);
  const encodedStr = bufferToString(encodedBinData);
  const decodedBinData = stringToBuffer(encodedStr);
  const result = decode(decodedBinData);

  t.equal(result, ISOString);

  t.end();
});

test('map with date', t => {
  const ISOString = '2020-12-20T10:45:12.000Z';
  const value = {
    prop: new Date(ISOString)
  };
  const encodedBinData = encode(value);
  const encodedStr = bufferToString(encodedBinData);
  const decodedBinData = stringToBuffer(encodedStr);
  const result = decode(decodedBinData);

  const expected = {
    prop: ISOString
  };

  t.deepEqual(result, expected);

  t.end();
});
