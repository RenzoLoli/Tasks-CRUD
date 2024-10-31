import { Task } from "../models/task.entity.js";
import { TaskRepository } from "../repositories/task.repository.js";
import { TaskMapper } from "../mappers/task.mapper.js";

/**
 * @class
 * @classdesc Servicio para comandos de tareas
 */
export class TaskCommandService {
  /**
   * @constructor
   * @param {TaskRepository} taskRepository Repositorio de tareas
   */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * Crea una tarea
   * @param {Types.CreateTask} command
   * @returns {Promise<Task | null>}
   */
  async create(command) {
    /* Reglas de negocio */
    const newTask = Task.create(command);

    if (!newTask) return null;

    /* Persistencia de datos */
    const taskPersistance = TaskMapper.toPersistance(newTask);
    const savedTask = await this.taskRepository.save(taskPersistance);

    if (!savedTask) return null;

    /* Respuesta del servicio */
    const task = TaskMapper.fromDto(savedTask);

    return task;
  }

  /**
   * Actualiza una tarea
   * @param {Types.UpdateTask} command
   * @returns {Promise<Task | null>}
   */
  async update(command) {
    /* Validacion de datos */
    const taskDto = await this.taskRepository.findById(command.id);

    if (!taskDto) {
      return null;
    }

    /* Reglas de negocio */
    const task = TaskMapper.fromDto(taskDto);
    task.update(command);

    /* Persistencia de datos */
    const taskPersistance = TaskMapper.toPersistance(task);
    const updatedTaskDto = await this.taskRepository.update(
      command.id,
      taskPersistance,
    );

    if (!updatedTaskDto) return null;

    /* Respuesta del servicio */
    const updatedTask = TaskMapper.fromDto(updatedTaskDto);
    return updatedTask;
  }

  /**
   * Elimina una tarea
   * @param {Types.DeleteTask} command
   * @returns {Promise<Types.TaskDto | null>}
   */
  async delete(command) {
    /* persistencia de datos */
    return await this.taskRepository.delete(command.id);
  }
}
