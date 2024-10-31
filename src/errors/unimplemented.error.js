import { BaseError } from "./base.error.js";

/**
 * @class
 * @classdesc Error: Funcionalidad no implementada
 * @extends {BaseError}
 */
export class UnimplementedError extends BaseError {
  /**
   * @constructor
   * @param {string} message
   */
  constructor(message) {
    super(message, "UnimplementedError");
  }
}
