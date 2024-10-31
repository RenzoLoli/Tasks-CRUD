import mongoose from "mongoose";
import { TASK_STATUS } from "../models/valueObjects/status.enum.js";

/**
 *
 * Filtros de consulta
 *
 */

/**
 * Filtros para buscar las tareas
 * @typedef AllTasksFilters
 * @type {Object}
 * @property {string?} titulo Buscar tareas por titulo (Opcional)
 * @property {TaskStatus?} estado Buscar tareas por estado (Opcional)
 */

/**
 *
 * Objetos de transporte y persstencia de datos
 *
 */

/**
 * Objeto para envio de persistencia de datos
 * @typedef TaskPersistance
 * @type {Object}
 * @property {string} titulo Titulo de la tarea
 * @property {string} descripcion Descripcion de la tarea
 * @property {TaskStatus} estado Estado actual de la tarea
 * @property {string} fechaCreacion Fecha de la creacion de la tarea
 * @property {string?} fechaVencimiento Fecha de vencimiento de la tarea (Opcional)
 */

/**
 * Dto de la entidad Task
 * @typedef TaskDto
 * @type {Object}
 * @property {mongoose.Types.ObjectId} _id Identificador unico de la entidad para mongodb
 * @property {string} titulo Titulo de la tarea
 * @property {string} descripcion Descripcion de la tarea
 * @property {TaskStatus} estado Estado actual de la tarea
 * @property {string} fechaCreacion Fecha de la creacion de la tarea
 * @property {string?} fechaVencimiento Fecha de vencimiento de la tarea (Opcional)
 */

/**
 *
 * Enumeraciones
 *
 */

/**
 * Enumeracion de los estados de la tarea
 * @typedef {keyof typeof TASK_STATUS} TaskStatus
 */

/**
 *
 * Comandos
 *
 */

/**
 * Comando para crear una tarea
 * @typedef CreateTask
 * @type {Object}
 * @property {string} titulo Nuevo titulo para la tarea
 * @property {string} descripcion Nueva descripcion para la tarea
 * @property {string?} fechaVencimiento Nueva fecha de vencimiento para la tarea (opcional)
 */

/**
 * Comando para actualizar una tarea
 * @typedef UpdateTask
 * @type {Object}
 * @property {string} id Identificador de la tarea a actualizar
 * @property {string?} titulo Nuevo titulo para actualizar la tarea (opcional)
 * @property {string?} descripcion Nueva descripcion para actualizar la tarea (opcional)
 * @property {string?} estado Nuevo estado de la tarea (opcional)
 * @property {string?} fechaVencimiento Nueva fecha de vencimiento para la tarea (opcional)
 */

/**
 * Comando para borrar una tarea
 * @typedef DeleteTask
 * @type {Object}
 * @property {string} id Identificador de la tarea a borrar
 */

/**
 * Queries
 */

/**
 * Query para ver todas las tareas con filtros
 * @typedef GetAllTasks
 * @type {Object}
 * @property {string?} titulo Nuevo titulo para la tarea (opcional)
 * @property {TaskStatus?} estado Nuevo estado de la tarea (opcional)
 */

/**
 * Query para ver una tarea por id
 * @typedef GetById
 * @type {Object}
 * @property {string} id Identificador de la tarea
 */

/**
 *
 * Recursos de entrada y salida del controlador
 *
 */

/**
 * @typedef TaskResource
 * @type {Object}
 * @property {string} id Identificador unico de la entidad
 * @property {string} titulo Titulo de la tarea
 * @property {string} descripcion Descripcion de la tarea
 * @property {TaskStatus} estado Estado actual de la tarea
 * @property {string} fechaCreacion Fecha de la creacion de la tarea
 * @property {string} fechaVencimiento Fecha de vencimiento de la tarea
 */

/**
 * @typedef CreateTaskResource
 * @type {Object}
 * @property {string} titulo Titulo de la tarea
 * @property {string} descripcion Descripcion de la tarea
 * @property {TaskStatus} estado Estado actual de la tarea
 * @property {string?} fechaVencimiento Fecha de vencimiento de la tarea (Opcional)
 */

/**
 * @typedef UpdateTaskResource
 * @type {Object}
 * @property {string?} titulo Titulo para actualizar la tarea (Opcional)
 * @property {string?} descripcion Descripcion para actualizar de la tarea (Opcional)
 * @property {TaskStatus?} estado Estado actual a acualizar de la tarea (Opcional)
 * @property {string?} fechaVencimiento Fecha de vencimiento a actualizar de la tarea (Opcional)
 */

/**
 * @typedef GetByIdTaskResource
 * @type {Object}
 * @property {string} id Buscar por identificador unico (Opcional)
 */

/**
 * @typedef ErrorResource
 * @type {Object}
 * @property {string} message Causa del error
 */

/**
 * @typedef MessageResource
 * @type {Object}
 * @property {string} message Mensaje de respuesta
 */

/**
 * @typedef FiltersQueryParams
 * @type {Object}
 * @property {string?} titulo Buscar tareas por titulo (Opcional)
 * @property {TaskStatus?} estado Buscar tareas por estado (Opcional)
 */

export const Types = {};
