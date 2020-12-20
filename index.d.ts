declare module 'binary-serde' {
  /**
   * Encode data
   *
   * @param data JS data to be encoded
   */
  export function encode<T> (data: T): Uint8Array;

  /**
   * Decode data from buffer into JS data
   */
  export function decode<T> (buff: Uint8Array): T;

  /**
   * Serialize a buffer into a HEX-encoded string
   */
  export function bufferToString (buff: Uint8Array): string;

  /**
   * Deserialize a HEX-encoded string into a buffer
   */
  export function stringToBuffer (str: string): Uint8Array;
}
