'use strict';

module.exports = function bufferToString (buff) {
  return [...buff]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
};
