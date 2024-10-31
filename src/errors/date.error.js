import { BaseError } from "./base.error.js";

/**
 * Error de fecha no valida
 * @class
 */
export class InvalidDateError extends BaseError {
  /**
   * @constructor
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = "InvalidDateError";
  }
}
