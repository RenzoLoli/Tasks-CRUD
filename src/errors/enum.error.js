import { BaseError } from "./base.error.js";

/**
 * @class
 * @classdesc Error: No encontrar una opcion en un enum
 * @extends {BaseError}
 */
export class NotFoundOnEnumError extends BaseError {
  /**
   * @constructor
   * @param {string} key
   */
  constructor(key) {
    super(`La opcion (${key}) no se encuentra`, "NotFoundOnEnumError");
  }
}
