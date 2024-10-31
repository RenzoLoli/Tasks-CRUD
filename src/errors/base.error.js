/**
 * @class
 * @classdesc Base de todos los errores
 */
export class BaseError extends Error {
  /**
   * @constructor
   * @param {any} message
   * @param {string} name
   */
  constructor(message, name) {
    super(message);
    this.name = name;
  }
}
