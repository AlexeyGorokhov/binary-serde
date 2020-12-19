'use strict';

const decodeElement = require('./decode-element');

/**
 * Decode passed highest-level Uint8Array buffer into a JS entity
 *
 * @param {Uint8Array} buff
 *
 * @return {*}
 */
module.exports = function decode (buff) {
  const { data } = decodeElement(buff);
  return data;
};
