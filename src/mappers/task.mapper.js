import { Task } from "../models/task.entity.js";
import * as Types from "../types/typedefs.js";
import { dateStringConvertion } from "../utils/date.utils.js";

/**
 *
 * @class
 * @classdesc Clase mapeadora de las Tasks
 */
export class TaskMapper {
  /**
   * Convertir un Task a TaskResource
   * @static
   * @param {Task} task
   * @returns {Types.TaskResource}
   */
  static toResource(task) {
    /**
     * @type {Types.TaskResource}
     */
    let resource = {};

    resource.id = task.getId();
    resource.titulo = task.getTitulo();
    resource.descripcion = task.getDescripcion();
    resource.estado = task.getEstado();
    resource.fechaCreacion = task.getFechaCreacionLocale();
    resource.fechaVencimiento = task.getFechaVencimientoLocale();

    return resource;
  }

  /**
   * Convertir un Task a TaskPersistance
   * @static
   * @param {Task} task
   * @returns {Types.TaskPersistance}
   */
  static toPersistance(task) {
    /**
     * @type {Types.TaskPersistance}
     */
    let persistance = {};

    persistance.titulo = task.getTitulo();
    persistance.descripcion = task.getDescripcion();
    persistance.estado = task.getEstado();
    persistance.fechaCreacion = task.getFechaCreacion();
    persistance.fechaVencimiento = task.getFechaVencimiento();

    return persistance;
  }

  /**
   * Convertir un taskDto a Task
   * @static
   * @param {Types.TaskDto} taskDto
   * @returns {Task}
   */
  static fromDto(taskDto) {
    /**
     * @type {Task}
     */
    let task = new Task();

    task.setId(taskDto._id.toString());
    task.setTitle(taskDto.titulo);
    task.setDescription(taskDto.descripcion);
    task.changeStatus(taskDto.estado);
    task.fechaCreacion = dateStringConvertion(taskDto.fechaCreacion);
    task.setExpirationDate(taskDto.fechaVencimiento);

    return task;
  }
}
