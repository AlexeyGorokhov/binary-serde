'use string';

/**
 * Determine type of data
 *
 * @param {*} data
 *
 * @return {String}
 */
module.exports = function getTypeOfDataChunk (data) {
  if (data == null) {
    return 'null';
  }

  if (data === false) {
    return 'false';
  }

  if (data === true) {
    return 'true';
  }

  if (typeof data === 'string') {
    return 'string';
  }

  if (Array.isArray(data)) {
    return 'array';
  }

  if (data instanceof Date) {
    return 'date';
  }

  if (typeof data === 'object') {
    return 'map';
  }

  if (typeof data === 'number') {
    if (Number.isFinite(data) && !Number.isNaN(data)) {
      if (Number.isInteger(data)) {
        return 'int';
      }

      return 'float';
    }

    throw new Error('binary-serde: non-serializable number');
  }
};
