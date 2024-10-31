import { getTaskQueryService } from "../../config/dependencyInjection.js";
import { handleError } from "../../errors/handleError.js";
import { TaskMapper } from "../../mappers/task.mapper.js";
import * as Types from "../../types/typedefs.js";

/**
 * Controlador para obtener una tarea segun su identificador unico
 * @param {express.Request} req Especificacion de la peticion elaborada
 * @param {express.Response} res Especificacion de la respuesta a la solicitud
 * @returns {express.Response}
 */
export const taskByIdRoute = async (req, res) => {
  try {
    const userQueryService = getTaskQueryService();

    /**
     * @type {Types.GetByIdTaskResource} Queries necesarias para los filtros
     */
    const { id } = req.params;

    if (!id) {
      /**
       * @type {Types.ErrorResource}
       */
      const resource = {
        message: "'id' es un campo requerido",
      };

      return res.status(400).json(resource);
    }

    /**
     * @type {Types.GetById} Queries necesarias para los filtros
     */
    const getgByIdQuery = {
      id,
    };

    const task = await userQueryService.getById(getgByIdQuery);

    if (!task) {
      /**
       * @type {Types.ErrorResource}
       */
      const resource = {
        message: "No se encontro la tarea",
      };

      return res.status(404).json(resource);
    }

    const resource = TaskMapper.toResource(task);

    return res.status(200).json(resource);
  } catch (e) {
    handleError(e);

    const resource = {
      message: e.message,
    };
    return res.status(500).json(resource);
  }
};
