'use strict';

const detectChunkDataType = require('./detect-chunk-data-type');

const _textDecoder = new TextDecoder('utf-8');

module.exports = function decodeElement (buff, offset = 0) {
  let currOffset = offset;

  const {
    type,
    bytes,
    value,
    elementsCount,
    offsetDelta
  } = detectChunkDataType(buff, currOffset);

  currOffset += offsetDelta;

  switch (type) {
    case 'null':
      return {
        data: null,
        nextOffset: currOffset
      };

    case 'false':
      return {
        data: false,
        nextOffset: currOffset
      };

    case 'true':
      return {
        data: true,
        nextOffset: currOffset
      };

    case 'int': {
      return {
        data: value,
        nextOffset: currOffset
      };
    }

    case 'float': {
      return {
        data: value,
        nextOffset: currOffset
      };
    }

    case 'string':
      return {
        data: _textDecoder.decode(buff.subarray(currOffset, currOffset + bytes)),
        nextOffset: currOffset + bytes
      };

    case 'array': {
      const result = [];

      for (let i = 1; i <= elementsCount; i += 1) {
        const { data, nextOffset } = decodeElement(buff, currOffset);
        result.push(data);
        currOffset = nextOffset;
      }

      return {
        data: result,
        nextOffset: currOffset
      };
    }

    case 'map': {
      const result = {};

      let currKey;

      for (let i = 1; i <= elementsCount; i += 1) {
        {
          const { data, nextOffset } = decodeElement(buff, currOffset);
          currKey = data;
          currOffset = nextOffset;
        }

        const { data, nextOffset } = decodeElement(buff, currOffset);
        currOffset = nextOffset;
        result[currKey] = data;
      }

      return {
        data: result,
        nextOffset: currOffset
      };
    }
  }
};
