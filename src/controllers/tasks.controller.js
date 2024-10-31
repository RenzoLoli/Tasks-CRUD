import express from "express";
import {
  allTasksRoute,
  createTaskRoute,
  deleteTaskRoute,
  taskByIdRoute,
  updateTaskRoute,
} from "./routes/index.js";

/**
 * Router de tareas
 * @type {express.Router}
 */
const tasksRouter = new express.Router();

/**
 * Controladores principales para las tareas
 */
tasksRouter.get("/", allTasksRoute);
tasksRouter.get("/:id", taskByIdRoute);
tasksRouter.post("/", createTaskRoute);
tasksRouter.put("/:id", updateTaskRoute);
tasksRouter.delete("/:id", deleteTaskRoute);

export { tasksRouter };
