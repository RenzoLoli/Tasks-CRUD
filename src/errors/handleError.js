import { logger } from "../config/logger.js";

/**
 * Manejo de errores
 * @param {any} e
 */
export function handleError(e) {
  if (e instanceof Error) {
    logger.error(e.name + " -> " + e.message);
  } else {
    logger.error("Error no identificado -> " + e);
  }
}
