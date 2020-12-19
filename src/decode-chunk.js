'use string';

const dataTypes = require('./data-types');

/**
 * Decode a particular chunk of data
 *
 * @param {Uint8Array} buff
 * @param {Integer} offset
 *
 * @return {Object}
 *     @prop {String} type Type of the chunk
 *     @prop {Integer} offsetDelta How many bytes the chunk occupies
 *     @prop {Integer?} bytes How many bytes the string encoded data occupies
 *     @prop {Number?} value Decoded numerical value
 *     @prop {Integer?} elementsCount Number of elements in a compound data structure
 */
module.exports = function decodeChunk (buff, offset) {
  const byte = buff[offset];

  const dataType = dataTypes.find(type => (byte & type.mask) === type.pattern);

  switch (dataType.name) {
    case 'nil':
      return {
        type: 'null',
        offsetDelta: 1
      };
    case 'false':
      return {
        type: 'false',
        offsetDelta: 1
      };
    case 'true':
      return {
        type: 'true',
        offsetDelta: 1
      };
    case 'positivefixnum':
      return {
        type: 'int',
        value: byte & dataType.argMask,
        offsetDelta: 1
      };
    case 'negativefixnum':
      return {
        type: 'int',
        value: -(byte & dataType.argMask),
        offsetDelta: 1
      };
    case 'uint8':
      return {
        type: 'int',
        value: (new DataView(buff.buffer, offset + 1, 1)).getUint8(0),
        offsetDelta: 2
      };
    case 'uint16':
      return {
        type: 'int',
        value: (new DataView(buff.buffer, offset + 1, 2)).getUint16(0, false),
        offsetDelta: 3
      };
    case 'uint32':
      return {
        type: 'int',
        value: (new DataView(buff.buffer, offset + 1, 4)).getUint32(0, false),
        offsetDelta: 5
      };
    case 'uint64':
      return {
        type: 'int',
        value: (new DataView(buff.buffer, offset + 1, 4)).getUint32(0, false) * (2 ** 32) +
          (new DataView(buff.buffer, offset + 5, 4)).getUint32(0, false),
        offsetDelta: 9
      };
    case 'int8':
      return {
        type: 'int',
        value: (new DataView(buff.buffer, offset + 1, 1)).getInt8(0),
        offsetDelta: 2
      };
    case 'int16':
      return {
        type: 'int',
        value: (new DataView(buff.buffer, offset + 1, 2)).getInt16(0, false),
        offsetDelta: 3
      };
    case 'int32':
      return {
        type: 'int',
        value: (new DataView(buff.buffer, offset + 1, 4)).getInt32(0, false),
        offsetDelta: 5
      };
    case 'int64':
      return {
        type: 'int',
        value: (new DataView(buff.buffer, offset + 1, 4)).getInt32(0, false) * (2 ** (32 - 1)) -
          (new DataView(buff.buffer, offset + 5, 4)).getUint32(0, false),
        offsetDelta: 9
      };
    case 'float64':
      return {
        type: 'float',
        value: (new DataView(buff.buffer, offset + 1, 8)).getFloat64(0, false),
        offsetDelta: 9
      };
    case 'fixstr':
      return {
        type: 'string',
        bytes: byte & dataType.argMask,
        offsetDelta: 1
      };
    case 'str8':
      return {
        type: 'string',
        bytes: buff[offset + 1],
        offsetDelta: 2
      };
    case 'str16':
      return {
        type: 'string',
        bytes: (new DataView(buff.buffer, offset + 1, 2)).getUint16(0, false),
        offsetDelta: 3
      };
    case 'fixarray':
      return {
        type: 'array',
        elementsCount: byte & dataType.argMask,
        offsetDelta: 1
      };
    case 'array16':
      return {
        type: 'array',
        elementsCount: (new DataView(buff.buffer, offset + 1, 2)).getUint16(0, false),
        offsetDelta: 3
      };
    case 'fixmap':
      return {
        type: 'map',
        elementsCount: byte & dataType.argMask,
        offsetDelta: 1
      };
    case 'map16':
      return {
        type: 'map',
        elementsCount: (new DataView(buff.buffer, offset + 1, 2)).getUint16(0, false),
        offsetDelta: 3
      };
    default:
      throw new Error('unknown data type');
  }
};
