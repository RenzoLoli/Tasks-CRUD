import { BaseError } from "./base.error.js";

/**
 * @class
 * @classdesc Error: Tipo de propiedad no valido
 * @extends {BaseError}
 */
export class PropertyTypeError extends BaseError {
  /**
   * @constructor
   * @param {string} message
   */
  constructor(message) {
    super(message, "PropertyTypeError");
  }
}
