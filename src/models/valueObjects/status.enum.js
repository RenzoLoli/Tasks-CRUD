/**
 * @enum
 */
const TASK_STATUS = {
  PENDIENTE: "pendiente",
  PROGRESO: "en progreso",
  COMPLETA: "completada",
};

/**
 * Busca y Valida si el status existe dentro de los permitidos
 * @param {keyof typeof TASK_STATUS} status
 * @returns {boolean}
 */
const existStatus = (status) => {
  return Object.values(TASK_STATUS).some((_status) => status == _status);
};

export { TASK_STATUS, existStatus };
