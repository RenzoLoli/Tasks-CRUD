import { getTaskQueryService } from "../../config/dependencyInjection.js";
import { handleError } from "../../errors/handleError.js";
import { TaskMapper } from "../../mappers/task.mapper.js";
import { existStatus } from "../../models/valueObjects/status.enum.js";
import * as Types from "../../types/typedefs.js";

/**
 * Controlador para obtener todas las tareas filtradas por titulo y descripcion
 * segun se necesite
 * @param {express.Request} req Especificacion de la peticion elaborada
 * @param {express.Response} res Especificacion de la respuesta a la solicitud
 * @returns {express.Response}
 */
export const allTasksRoute = async (req, res) => {
  try {
    const userQueryService = getTaskQueryService();

    /**
     * @type {Types.FiltersQueryParams} Queries necesarias para los filtros
     */
    const { titulo, estado } = req.query;

    if (!titulo && !estado && !existStatus(estado)) {
      const tasks = await userQueryService.getAll();
      const resources = tasks.map(TaskMapper.toResource);
      return res.status(200).json(resources);
    }

    /**
     * @type {Types.GetAllTasks} Queries necesarias para los filtros
     */
    const getAllTaskQuery = {
      titulo,
      estado,
    };

    const tasks = await userQueryService.getAllFiltered(getAllTaskQuery);

    if (!tasks) {
      /**
       * @type {Types.ErrorResource}
       */
      const resource = {
        message: "No se encontro la tarea",
      };
      return res.status(404).json(resource);
    }

    const resources = tasks.map(TaskMapper.toResource);

    return res.status(200).json(resources);
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
