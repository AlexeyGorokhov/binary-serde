'use strict';

const encode = require('./src/encode');
const decode = require('./src/decode');
const bufferToString = require('./src/buffer-to-string');
const stringToBuffer = require('./src/string-to-buffer');

module.exports = {
  encode,
  decode,
  bufferToString,
  stringToBuffer
};
