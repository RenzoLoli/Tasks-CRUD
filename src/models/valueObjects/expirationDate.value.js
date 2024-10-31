import { PropertyTypeError } from "../../errors/input.error.js";
import { dateStringConvertion } from "../../utils/date.utils.js";

/**
 * Fecha de vencimiento de la tarea
 * @class
 */
export class ExpirationDate {
  /**
   * @type {Date} Fecha de expiracion en formato string
   */
  date;

  /**
   * @constructor
   * @param {string | Date} expiration Fecha de expiracion en cualquier formato de fecha
   * @throws {PropertyTypeError}
   */
  constructor(expiration) {
    this.setDate(expiration);
  }

  /**
   * @returns {string} Fecha de expiracion en formato string
   */
  getStringDate() {
    return this.date.toDateString();
  }

  /**
   * @returns {string} Fecha de expiracion en formato peruano
   */
  getStringLocale() {
    return this.date.toLocaleDateString("es-PE");
  }

  /**
   * Establece la fecha de expiracion
   * @param {string | Date} expiration
   * @throws {PropertyTypeError}
   */
  setDate(expiration) {
    if (typeof expiration == "string") {
      this.date = dateStringConvertion(expiration);
    } else if (expiration instanceof Date) {
      this.date = expiration;
    } else {
      throw new PropertyTypeError(
        `el tipo (${type(expiration)}) para la fecha de expiracion no esta permitido`,
      );
    }
  }

  /**
   * Comprueba si la fecha de expiracion es previa a la fecha actual
   * @param {Date} date
   * @returns {boolean}
   */
  previousTo(date) {
    return this.date <= date;
  }
}
