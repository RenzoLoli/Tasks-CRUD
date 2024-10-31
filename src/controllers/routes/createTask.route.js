import { getTaskCommandService } from "../../config/dependencyInjection.js";
import { handleError } from "../../errors/handleError.js";
import { TaskMapper } from "../../mappers/task.mapper.js";
import * as Types from "../../types/typedefs.js";

/**
 * Controlador para crear una tarea
 * @param {express.Request} req Especificacion de la peticion elaborada
 * @param {express.Response} res Especificacion de la respuesta a la solicitud
 * @returns {express.Response}
 */
export const createTaskRoute = async (req, res) => {
  try {
    const userCommandService = getTaskCommandService();

    /**
     * Queries necesarias para los filtros
     * @type {Types.CreateTaskResource}
     */
    const { titulo, descripcion, fechaVencimiento } = req.body;

    if (!titulo || !descripcion) {
      /**
       * Tipo de error de validacion del cuerpo de la peticion
       * @type {Types.ErrorResource}
       */
      const resource = {
        message: "Cuerpo de la peticion no esta completo",
      };

      return res.status(400).json(resource);
    }

    /**
     * Queries necesarias para los filtros
     * @type {Types.CreateTask}
     */
    const createTaskQuery = {
      titulo,
      descripcion,
      fechaVencimiento,
    };

    const task = await userCommandService.create(createTaskQuery);

    if (!task) {
      /**
       * @type {Types.ErrorResource}
       */
      const resource = {
        message: "No se pudo crear la tarea",
      };
      return res.status(500).json(resource);
    }

    const resource = TaskMapper.toResource(task);

    return res.status(201).json(resource);
  } catch (e) {
    handleError(e);

    /**
     * @type {Types.ErrorResource}
     */
    const resource = {
      message: e.message,
    };
    return res.status(500).json(resource);
  }
};
