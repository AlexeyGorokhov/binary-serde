'use strict';

module.exports = function concatenateBuffers (...buffers) {
  let totalLength = 0;

  for (const buffer of buffers) {
    totalLength += buffer.length;
  }

  const concatenatedBuff = new Uint8Array(totalLength);

  let offset = 0;

  for (const buffer of buffers) {
    concatenatedBuff.set(buffer, offset);
    offset += buffer.length;
  }

  return concatenatedBuff;
};
