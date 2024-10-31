import { asClass, asValue, createContainer, InjectionMode } from "awilix";

import { TaskRepository } from "../repositories/task.repository.js";
import { TaskCommandService } from "../services/taskCommand.service.js";
import { TaskQueryService } from "../services/taskQuery.service.js";
import mongoose from "mongoose";

const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

/**
 * @param {typeof mongoose} database base de datos en mongodb
 */
function configContainer(database) {
  container.register({
    database: asValue(database),
    taskRepository: asClass(TaskRepository).singleton(),
    taskQueryService: asClass(TaskQueryService).singleton(),
    taskCommandService: asClass(TaskCommandService).singleton(),
  });
}

/**
 * Devuelve el servicio de consulta de tareas
 * @returns {TaskQueryService}
 */
function getTaskQueryService() {
  return container.resolve("taskQueryService");
}

/**
 * Devuelve el servicio de comandos de tareas
 * @returns {TaskCommandService}
 */
function getTaskCommandService() {
  return container.resolve("taskCommandService");
}

export { configContainer, getTaskCommandService, getTaskQueryService };
