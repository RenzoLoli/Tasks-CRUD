import { BaseError } from "./base.error.js";

/**
 * @class
 * @classdesc Error: Tamaño minimo de texto no se cumple
 * @extends {BaseError}
 */
export class MinLenghtError extends BaseError {
  /**
   * @constructor
   * @param {number} minLen Tamaño minimo requerido
   * @param {number} currentLen Tamaño actual
   */
  constructor(key, minLen, currentLen) {
    super(
      `Tamaño minimo de ${key} debe ser de ${minLen} (Actual: ${currentLen})`,
      "MinLenghtError",
    );
  }
}

/**
 * @class
 * @classdesc Error: Tamaño maximo de texto no se cumple
 * @extends {BaseError}
 */
export class MaxLenghtError extends BaseError {
  /**
   * @constructor
   * @param {number} maxLen Tamaño maximo requerido
   * @param {number} currentLen Tamaño actual
   */
  constructor(maxLen, currentLen) {
    super(
      `Tamaño maximo debe ser de ${maxLen} (Actual: ${currentLen})`,
      "MaxLenghtError",
    );
  }
}
