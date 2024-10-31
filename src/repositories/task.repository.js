import * as Types from "../types/typedefs.js";
import { MongoDbError } from "../errors/database.error.js";
import { taskModel } from "../models/task.model.js";
import mongoose from "mongoose";

/**
 * @class
 * @classdesc Repositorio de tareas basado en mongodb
 */
export class TaskRepository {
  /**
   * @constructor
   * @param {typeof mongoose} database
   */
  constructor(database) {
    this.database = database;
  }

  /**
   * Obtener una tarea segun su identificador unico
   * @param {string} id Identificador unico de la tarea
   * @throws {MongoDbError}
   * @returns {Promise<Types.TaskDto | null>}
   */
  async findById(id) {
    try {
      const task = await taskModel.findById(id).lean();
      return task;
    } catch (error) {
      throw new MongoDbError("Error al obtener tarea con id " + id);
    }
  }

  /**
   * Obtener todas las tareas
   * @throws {MongoDbError}
   * @returns {Promise<Types.TaskDto[]>}
   */
  async getAll() {
    try {
      const tasks = await taskModel.find().lean();
      return tasks;
    } catch (error) {
      throw new MongoDbError("Error al obtener tareas");
    }
  }

  /**
   * Obtener todas las tareas segun filtros
   * @param {Types.AllTasksFilters} filters Filtros para buscar las tareas
   * @throws {MongoDbError}
   * @returns {Promise<Types.TaskDto[]>}
   */
  async getAllFiltered(filters) {
    try {
      const filter = {};
      if (filters.titulo) filter.titulo = filters.titulo;
      if (filters.estado) filter.estado = filters.estado;

      const tasks = await taskModel.find(filter).lean();

      return tasks;
    } catch (error) {
      throw new MongoDbError("Error al obtener tareas");
    }
  }

  /**
   * Guardar una tarea
   * @param {Types.TaskPersistance} task Tarea a guardar
   * @throws {MongoDbError}
   * @returns {Promise<Types.TaskDto>}
   */
  async save(task) {
    try {
      const savedTask = await taskModel.create(task);
      return savedTask;
    } catch (error) {
      throw new MongoDbError("Error al guardar tarea (" + error.message + ")");
    }
  }

  /**
   * Actualizar una tarea segun su identificador unico
   * @param {string} id Identificador unico de la tarea
   * @param {Types.TaskPersistance} task Tarea a actualizar
   * @throws {MongoDbError}
   * @returns {Promise<Types.TaskDto | null>}
   */
  async update(id, task) {
    try {
      return await taskModel.findByIdAndUpdate(id, task).lean();
    } catch (error) {
      throw new MongoDbError("Error al actualizar tarea con id " + id);
    }
  }

  /**
   * Eliminar una tarea segun su identificador unico
   * @param {string} id Identificador unico de la tarea
   * @throws {MongoDbError}
   * @returns {Promise<Types.TaskDto | null>}
   */
  async delete(id) {
    try {
      return await taskModel.findByIdAndDelete(id).lean();
    } catch (error) {
      throw new MongoDbError("Error al eliminar tarea con id " + id);
    }
  }
}
