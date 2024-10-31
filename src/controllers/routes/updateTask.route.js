import { getTaskCommandService } from "../../config/dependencyInjection.js";
import { handleError } from "../../errors/handleError.js";
import { TaskMapper } from "../../mappers/task.mapper.js";
import * as Types from "../../types/typedefs.js";

/**
 * Controlador para actualizar una tarea segun su identificador unico
 * @param {express.Request} req Especificacion de la peticion elaborada
 * @param {express.Response} res Especificacion de la respuesta a la solicitud
 * @returns {express.Response}
 */
export const updateTaskRoute = async (req, res) => {
  try {
    const userCommandService = getTaskCommandService();

    /**
     * Recursos necesarios para la actualizacion
     * @type {Types.UpdateTaskResource}
     */
    const { titulo, descripcion, estado, fechaVencimiento } = req.body;

    /**
     * Identificador unico de la tarea
     */
    const { id } = req.params;

    if (!id) {
      /**
       * @type {Types.ErrorResource}
       */
      const resource = {
        message: "Es necesario una id para actualizar el recurso",
      };
      return res.status(400).json(resource);
    }

    /**
     * Queries necesarias para los filtros
     * @type {Types.UpdateTask}
     */
    const updateTaskQuery = {
      id,
      titulo,
      descripcion,
      fechaVencimiento,
      estado,
    };

    const task = await userCommandService.update(updateTaskQuery);

    if (!task) {
      /**
       * @type {Types.ErrorResource}
       */
      const resource = {
        message: "No se pudo actualizar la tarea",
      };
      return res.status(500).json(resource);
    }

    const resource = TaskMapper.toResource(task);

    return res.status(200).json(resource);
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
