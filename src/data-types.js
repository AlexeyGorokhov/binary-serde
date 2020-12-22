const dataTypes = [
  {
    name: 'nil',
    mask: 0xff,
    pattern: 0xc0,
    argMask: null
  },
  {
    name: 'false',
    mask: 0xff,
    pattern: 0xc2,
    argMask: null
  },
  {
    name: 'true',
    mask: 0xff,
    pattern: 0xc3,
    argMask: null
  },
  {
    name: 'positivefixnum',
    mask: 0b10000000,
    pattern: 0b00000000,
    argMask: 0b01111111
  },
  {
    name: 'negativefixnum',
    mask: 0b11100000,
    pattern: 0b11100000,
    argMask: 0b00011111
  },
  {
    name: 'uint8',
    mask: 0xff,
    pattern: 0xcc,
    argMask: null
  },
  {
    name: 'uint16',
    mask: 0xff,
    pattern: 0xcd,
    argMask: null
  },
  {
    name: 'uint32',
    mask: 0xff,
    pattern: 0xce,
    argMask: null
  },
  {
    name: 'uint64',
    mask: 0xff,
    pattern: 0xcf,
    argMask: null
  },
  {
    name: 'int8',
    mask: 0xff,
    pattern: 0xd0,
    argMask: null
  },
  {
    name: 'int16',
    mask: 0xff,
    pattern: 0xd1,
    argMask: null
  },
  {
    name: 'int32',
    mask: 0xff,
    pattern: 0xd2,
    argMask: null
  },
  {
    name: 'int64',
    mask: 0xff,
    pattern: 0xd3,
    argMask: null
  },
  {
    name: 'float64',
    mask: 0xff,
    pattern: 0xcb,
    argMask: null
  },
  {
    name: 'fixstr',
    mask: 0b11100000,
    pattern: 0b10100000,
    argMask: 0b00011111
  },
  {
    name: 'str8',
    mask: 0xff,
    pattern: 0xd9,
    argMask: null
  },
  {
    name: 'str16',
    mask: 0xff,
    pattern: 0xda,
    argMask: null
  },
  {
    name: 'fixarray',
    mask: 0b11110000,
    pattern: 0b10010000,
    argMask: 0b00001111
  },
  {
    name: 'array16',
    mask: 0xff,
    pattern: 0xdc,
    argMask: null
  },
  {
    name: 'fixmap',
    mask: 0b11110000,
    pattern: 0b10000000,
    argMask: 0b00001111
  },
  {
    name: 'map16',
    mask: 0xff,
    pattern: 0xde,
    argMask: null
  }
];

module.exports = dataTypes;
