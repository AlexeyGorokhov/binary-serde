'use strict';

const decodeElement = require('./decode-element');

module.exports = function decode (buff) {
  const { data } = decodeElement(buff);
  return data;
};
