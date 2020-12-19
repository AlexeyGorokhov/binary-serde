'use strict';

const getTypeOfDataChunk = require('./get-type-of-data-chunk');
const concatenateBuffers = require('./concatenate-buffers');
const decodeElement = require('./decode-element');

const _textEncoder = new TextEncoder();

module.exports = {
  encode,
  decode,
  stringToBuffer,
  bufferToString
};

function encode (data) {
  const chunkDataType = getTypeOfDataChunk(data);

  switch (chunkDataType) {
    case 'null': {
      const result = new Uint8Array(1);
      result[0] = 0xc0;
      return result;
    }

    case 'false': {
      const result = new Uint8Array(1);
      result[0] = 0xc2;
      return result;
    }

    case 'true': {
      const result = new Uint8Array(1);
      result[0] = 0xc3;
      return result;
    }

    case 'int': {
      if (data >= 0 && data <= 127) {
        const result = new Uint8Array(1);
        result[0] = 0b0000_0000 + data;
        return result;
      }

      if (data < 0 && data >= -31) {
        const result = new Uint8Array(1);
        result[0] = 0b1110_0000 + (-data);
        return result;
      }

      if (data > 127 && data <= 255) {
        const result = new Uint8Array(2);
        result[0] = 0xcc;
        (new DataView(result.buffer, 1, 1)).setUint8(0, data);
        return result;
      }

      if (data > 255 && data < (2 ** 16)) {
        const result = new Uint8Array(3);
        result[0] = 0xcd;
        (new DataView(result.buffer, 1, 2)).setUint16(0, data, false);
        return result;
      }

      if (data >= (2 ** 16) && data < (2 ** 32)) {
        const result = new Uint8Array(5);
        result[0] = 0xce;
        (new DataView(result.buffer, 1, 4)).setUint32(0, data, false);
        return result;
      }

      if (data >= (2 ** 32) && data <= Number.MAX_SAFE_INTEGER) {
        const lower = data % (2 ** 32);
        const upper = (data - lower) / (2 ** 32);
        const result = new Uint8Array(9);
        result[0] = 0xcf;
        (new DataView(result.buffer, 1, 4)).setUint32(0, upper, false);
        (new DataView(result.buffer, 5, 4)).setUint32(0, lower, false);
        return result;
      }

      if (data < -31 && data >= -127) {
        const result = new Uint8Array(2);
        result[0] = 0xd0;
        (new DataView(result.buffer, 1, 1)).setInt8(0, data);
        return result;
      }

      if (data < -127 && data >= -(2 ** (16 - 1))) {
        const result = new Uint8Array(3);
        result[0] = 0xd1;
        (new DataView(result.buffer, 1, 2)).setInt16(0, data, false);
        return result;
      }

      if (data < -(2 ** (16 - 1)) && data >= -(2 ** (32 - 1))) {
        const result = new Uint8Array(5);
        result[0] = 0xd2;
        (new DataView(result.buffer, 1, 4)).setInt32(0, data, false);
        return result;
      }

      if (data < -(2 ** (32 - 1)) && data >= Number.MIN_SAFE_INTEGER) {
        const lower = (-data) % (2 ** (32 - 1));
        const upper = (data + lower) / (2 ** (32 - 1));
        const result = new Uint8Array(9);
        result[0] = 0xd3;
        (new DataView(result.buffer, 1, 4)).setInt32(0, upper, false);
        (new DataView(result.buffer, 5, 4)).setUint32(0, lower, false);
        return result;
      }

      if (data < Number.MIN_SAFE_INTEGER) {
        throw new Error('integer is too small for serialization');
      }

      throw new Error('integer is too large for serialization');
    }

    case 'float': {
      const result = new Uint8Array(9);
      result[0] = 0xcb;
      (new DataView(result.buffer, 1, 8)).setFloat64(0, data, false);
      return result;
    }

    case 'string': {
      const encodedString = _textEncoder.encode(data);

      if (encodedString.length <= 31) {
        const result = new Uint8Array(encodedString.length + 1);
        result[0] = 0b1010_0000 + encodedString.length;
        result.set(encodedString, 1);
        return result;
      }

      if (encodedString.length < (2 ** 8)) {
        const result = new Uint8Array(encodedString.length + 2);
        result[0] = 0xd9;
        result[1] = encodedString.length;
        result.set(encodedString, 2);
        return result;
      }

      if (encodedString.length < (2 ** 16)) {
        const result = new Uint8Array(encodedString.length + 3);
        result[0] = 0xda;
        result[1] = encodedString.length >> 8;
        result[2] = encodedString.length & 255;
        result.set(encodedString, 3);
        return result;
      }

      throw new Error('string is too large for serialization');
    }

    case 'array': {
      const len = data.length;

      if (len <= 15) {
        const prefixBuff = new Uint8Array(1);
        prefixBuff[0] = 0b1001_0000 + len;
        const elementBuffs = data.map(x => encode(x));
        return concatenateBuffers(prefixBuff, ...elementBuffs);
      }

      if (len <= (2 ** 16) - 1) {
        const prefixBuff = new Uint8Array(3);
        prefixBuff[0] = 0xdc;
        prefixBuff[1] = len >> 8;
        prefixBuff[2] = len & 255;
        const elementBuffs = data.map(x => encode(x));
        return concatenateBuffers(prefixBuff, ...elementBuffs);
      }

      throw new Error('array is too large for serialization');
    }

    case 'map': {
      const len = Object.keys(data).length;

      if (len <= 15) {
        const prefixBuff = new Uint8Array(1);
        prefixBuff[0] = 0b1000_0000 + len;
        const elementBuffs = Object.keys(data).map(key => {
          const keyBuff = encode(key);
          const valueBuff = encode(data[key]);
          return concatenateBuffers(keyBuff, valueBuff);
        });
        return concatenateBuffers(prefixBuff, ...elementBuffs);
      }

      if (len <= (2 ** 16) - 1) {
        const prefixBuff = new Uint8Array(3);
        prefixBuff[0] = 0xde;
        prefixBuff[1] = len >> 8;
        prefixBuff[2] = len & 255;
        const elementBuffs = Object.keys(data).map(key => {
          const keyBuff = encode(key);
          const valueBuff = encode(data[key]);
          return concatenateBuffers(keyBuff, valueBuff);
        });
        return concatenateBuffers(prefixBuff, ...elementBuffs);
      }

      throw new Error('object is too large for serialization');
    }

    case 'date':
      return encode(data.toISOString());
  }
}

function decode (buff) {
  const { data } = decodeElement(buff);
  return data;
}

function stringToBuffer (str) {
  const buff = new Uint8Array(Math.floor(str.length / 2));

  for (let i = 0; i < str.length; i += 1) {
    if (i % 2 === 0) continue;

    buff[(i - 1) / 2] = Number.parseInt(str[i - 1] + str[i], 16);
  }

  return buff;
}

function bufferToString (buff) {
  return [...buff]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}
