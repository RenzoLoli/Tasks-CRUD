import * as Types from "../types/typedefs.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { handleError } from "../errors/handleError.js";
import { TaskMapper } from "../mappers/task.mapper.js";

/**
 * Servicio para consultar tareas
 * @class TaskQueryService
 */
export class TaskQueryService {
  /**
   * @constructor
   * @param {TaskRepository} taskRepository Repositorio de tareas
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * @param {Types.GetAllTasks} query Query para obtener todas las tareas segun filtros
   * @returns {Promise<Task[]>}
   */
  async getAllFiltered(query) {
    try {
      /* Obtencion de datos de consulta mas filtros */

      /**
       * @type {Types.AllTasksFilters}
       */
      const filter = {
        titulo: query.titulo,
        estado: query.estado,
      };
      const tasksDto = await this.taskRepository.getAllFiltered(filter);

      /* Respuesta del servicio */
      const tasks = tasksDto.map(TaskMapper.fromDto);
      return tasks;
    } catch (e) {
      handleError(e);
      return [];
    }
  }

  /**
   * Obtener todas las tareas
   * @returns {Promise<Task[]>}
   */
  async getAll() {
    try {
      /* Obtencion de datos de consulta */
      const tasksDto = await this.taskRepository.getAll();

      /* Respuesta del servicio */
      const tasks = tasksDto.map(TaskMapper.fromDto);
      return tasks;
    } catch (e) {
      handleError(e);
      return [];
    }
  }

  /**
   * @param {GetById} query Query para buscar una tarea segun su Identificador unico
   * @returns {Promise<Task | null>}
   */
  async getById(query) {
    try {
      /* Obtencion de datos de consulta */
      const taskDto = await this.taskRepository.findById(query.id);
      if (!taskDto) return null;

      /* Respuesta del servicio */
      const task = TaskMapper.fromDto(taskDto);
      return task;
    } catch (e) {
      handleError(e);
      return null;
    }
  }
}
