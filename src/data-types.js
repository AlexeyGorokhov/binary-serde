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
    mask: 0b1000_0000,
    pattern: 0b0000_0000,
    argMask: 0b0111_1111
  },
  {
    name: 'negativefixnum',
    mask: 0b1110_0000,
    pattern: 0b1110_0000,
    argMask: 0b0001_1111
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
    mask: 0b1110_0000,
    pattern: 0b1010_0000,
    argMask: 0b0001_1111
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
    mask: 0b1111_0000,
    pattern: 0b1001_0000,
    argMask: 0b0000_1111
  },
  {
    name: 'array16',
    mask: 0xff,
    pattern: 0xdc,
    argMask: null
  },
  {
    name: 'fixmap',
    mask: 0b1111_0000,
    pattern: 0b1000_0000,
    argMask: 0b0000_1111
  },
  {
    name: 'map16',
    mask: 0xff,
    pattern: 0xde,
    argMask: null
  }
];

module.exports = dataTypes;
