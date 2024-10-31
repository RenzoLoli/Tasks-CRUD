import { InvalidDateError } from "../errors/date.error.js";
import { NotFoundOnEnumError } from "../errors/enum.error.js";
import { PropertyTypeError } from "../errors/input.error.js";
import { MinLenghtError } from "../errors/text.error.js";
import * as Types from "../types/typedefs.js";
import { ExpirationDate } from "./valueObjects/expirationDate.value.js";
import { existStatus, TASK_STATUS } from "./valueObjects/status.enum.js";
import { StringValue } from "./valueObjects/stringValue.value.js";

/**
 * @class
 * @classdesc Define la logica de negocio para las tareas
 */
export class Task {
  /**
   * @constructor
   */
  constructor() {
    /**
     * Identificador Unico de la entidad
     * @type {string}
     */
    this.id = "";

    /**
     * Titulo de la tarea
     * Debe tener un tamaño menor a 50
     * Debe tener un tamaño mayor a 2
     * @type {StringValue}
     */
    this.titulo = new StringValue("", 50);

    /**
     * Descripcion de la tarea
     * Debe tener un tamaño menor a 400
     * Debe tener un tamaño mayor a 2
     * @type {StringValue}
     */
    this.descripcion = new StringValue("", 400);

    /**
     * Estado de la tarea
     * @type {Types.TaskStatus}
     */
    this.estado = TASK_STATUS.PENDIENTE;

    /**
     * Fecha de vencimiento de la tarea (Opcional)
     * @type {ExpirationDate | undefined}
     */
    this.fechaVencimiento = undefined;

    /**
     * Identificador único de la entidad.
     * @type {Date}
     */
    this.fechaCreacion = new Date(Date.now());
  }

  /**
   * Crear una nueva tarea
   * @static
   * @param {Types.CreateTask} command
   * @returns {Task}
   */
  static create(command) {
    let task = new Task();

    task.setTitle(command.titulo);
    task.setDescription(command.descripcion);
    task.setExpirationDate(command.fechaVencimiento);
    task.changeStatus(TASK_STATUS.PENDIENTE);
    task.fechaCreacion = new Date(Date.now());

    return task;
  }

  /**
   * Actualizar la tarea
   * @param {Types.UpdateTask} command
   * @returns {Task}
   */
  update(command) {
    command.titulo && this.setTitle(command.titulo);
    command.descripcion && this.setDescription(command.descripcion);
    command.estado && this.changeStatus(command.estado);
    command.fechaVencimiento &&
      this.setExpirationDate(command.fechaVencimiento);
  }

  /**
   * Obtener el identificador unico
   * @returns {string}
   */
  getId() {
    return this.id;
  }

  /**
   * Obtener el titulo
   * @returns {string}
   */
  getTitulo() {
    return this.titulo.getContent();
  }

  /**
   * Obtener la Descripcion
   * @returns {string}
   */
  getDescripcion() {
    return this.descripcion.getContent();
  }

  /**
   * Obtener el estado actual de la tarea
   * @returns {Types.TaskStatus}
   */
  getEstado() {
    return this.estado;
  }

  /**
   * Obtener la fecha de creacion
   * @returns {string}
   */
  getFechaCreacion() {
    return this.fechaCreacion.toDateString();
  }

  /**
   * Obtener la fecha de creacion en formato peruano
   * @returns {string | undefined}
   */
  getFechaCreacionLocale() {
    return this.fechaCreacion.toLocaleDateString("es-PE");
  }

  /**
   * Obtener la fecha de vencimiento
   * @returns {string | undefined}
   */
  getFechaVencimiento() {
    return this.fechaVencimiento?.getStringDate();
  }

  /**
   * Obtener la fecha de vencimiento en formato peruano
   * @returns {string | undefined}
   */
  getFechaVencimientoLocale() {
    return this.fechaVencimiento?.getStringLocale();
  }

  /**
   * Obtener la fecha de vencimiento
   * @returns {Date | undefined}
   */
  getExpirationDate() {
    return this.fechaVencimiento?.date;
  }

  /**
   * Obtener la fechaa de creacion
   * @returns {string}
   */
  getCreationDate() {
    return this.fechaCreacion;
  }

  /**
   * Actualizar el estado actual de la tarea
   * @param {Types.TaskStatus} status
   */
  changeStatus(status) {
    if (typeof status != "string")
      new PropertyTypeError("El nuevo estado debe ser un 'string'");

    if (!existStatus(status)) throw new NotFoundOnEnumError(status);

    this.estado = status;
  }

  /**
   * Actualizar el titulo
   * @param {string} title
   */
  setTitle(title) {
    this.titulo.setContent(title);
  }

  /**
   * Añadir un identificador unico
   * @param {string} id
   */
  setId(id) {
    if (typeof id != "string")
      new PropertyTypeError("El nuevo id debe ser un 'string'");

    if (!id.length) throw new MinLenghtError("id", 8, id.length);

    this.id = id;
  }

  /**
   * Actualizar el description
   * @param {string} description
   */
  setDescription(description) {
    this.descripcion.setContent(description);
  }

  /**
   * Actualizar la fecha de vencimiento
   * @param {string | Date | undefined} expiration
   */
  setExpirationDate(expiration) {
    /** No hacer nada en caso de datos de entrada no definidos */
    if (expiration == undefined) {
      this.fechaVencimiento = undefined;
      return;
    }

    /** llenar la fecha de vencimiento si no esta definida */
    if (this.fechaVencimiento) this.fechaVencimiento.setDate(expiration);
    else this.fechaVencimiento = new ExpirationDate(expiration);

    /** Validar que la fecha de vencimiento no sea menor a la de creacion*/
    if (this.fechaVencimiento.previousTo(this.fechaCreacion)) {
      throw new InvalidDateError(
        "La fecha de expiracion no puede ser anterior a la fecha actual",
      );
    }
  }
}
