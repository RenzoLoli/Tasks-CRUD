import { BaseError } from "./base.error.js";

/**
 * @class
 * @classdesc Error: Base de todos los errores relacionados con la base de datos mongodb
 * @extends {BaseError}
 */
export class MongoDbError extends BaseError {
  /**
   * @constructor
   * @param {string} message
   */
  constructor(message) {
    super(message, "MongoDbError");
  }
}
