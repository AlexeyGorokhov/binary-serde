'use strict';

/**
 * Decode HEX-encoded string into Uint8Array buffer
 *
 * @param {String} str
 *
 * @return {Uint8Array}
 */
module.exports = function stringToBuffer (str) {
  const buff = new Uint8Array(Math.floor(str.length / 2));

  for (let i = 0; i < str.length; i += 1) {
    if (i % 2 === 0) continue;

    buff[(i - 1) / 2] = Number.parseInt(str[i - 1] + str[i], 16);
  }

  return buff;
};
