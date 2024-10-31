import { PropertyTypeError } from "../../errors/input.error.js";
import { MaxLenghtError, MinLenghtError } from "../../errors/text.error.js";

/**
 * @class
 * @classdesc Valor de texto con tamaño maximos y minimos
 */
export class StringValue {
  /**
   * @property
   * @type {string} _content Contenido de la cadena
   */
  _content;
  /**
   * @property
   * @type {Number} _maxLen Tamaño maximo de la cadena
   */
  _maxLen;

  /**
   * @constructor
   * @param {string} content Contenido inicial de la cadena
   * @param {Number} maxLen Tamaño maximo de la cadena
   */
  constructor(content, maxLen) {
    this.setMaxLen(maxLen);
    this.setContent(content);
  }

  /**
   * @returns {string} Contenido de la cadena
   */
  getContent() {
    return this._content;
  }

  /**
   * @returns {Number} Tamaño maximo de la cadena
   */
  getMaxLen() {
    return this._maxLen;
  }

  /**
   * @param {string} value Contenido nuevo de la cadena
   */
  setContent(value) {
    if (typeof value == "string") {
      if (value.length > this._maxLen) throw new MaxLenghtError(this._maxLen);

      this._content = value;
    } else {
      throw new PropertyTypeError(
        `el tipo (${type(value)}) para los textos no esta permitido`,
      );
    }
  }

  /**
   * @param {Number | string} value nuevo del valor maximo
   */
  setMaxLen(value) {
    if (typeof value == "number") {
      this._maxLen = value;
    } else if (typeof value == "string") {
      this._maxLen = Number.parseInt(value);
    } else {
      throw PropertyTypeError(
        `el tipo (${type(value)}) para los textos no esta permitido`,
      );
    }
  }
}
