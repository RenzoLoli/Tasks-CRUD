import { getTaskCommandService } from "../../config/dependencyInjection.js";
import { handleError } from "../../errors/handleError.js";
import * as Types from "../../types/typedefs.js";

/**
 * Controlador para eliminar una tarea segun su identificador unico
 * @param {express.Request} req Especificacion de la peticion elaborada
 * @param {express.Response} res Especificacion de la respuesta a la solicitud
 * @returns {express.Response}
 */
export const deleteTaskRoute = async (req, res) => {
  try {
    const userCommandService = getTaskCommandService();

    /**
     * Identificador unico de la tarea
     */
    const { id } = req.params;

    /**
     * Recursos necesarios para la actualizacion
     * @type {Types.DeleteTask}
     */
    const deleteTaskQuery = {
      id,
    };

    const task = await userCommandService.delete(deleteTaskQuery);

    if (!task) {
      /**
       * @type {Types.ErrorResource}
       */
      const resource = {
        message: "No existe la tarea",
      };
      return res.status(500).json(resource);
    }

    /**
     * @type {Types.MessageResource}
     */
    const resource = {
      message: "Tarea eliminada",
    };
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
