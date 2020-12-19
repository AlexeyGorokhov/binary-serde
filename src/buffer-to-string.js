'use strict';

/**
 * Convert passed Uint8Array buffer into a HEX-encoded string
 *
 * @param {Uint8Array} buff
 *
 * @return {String}
 */
module.exports = function bufferToString (buff) {
  return [...buff]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
};
