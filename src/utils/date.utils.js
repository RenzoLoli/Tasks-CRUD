/**
 * Convierte una fecha en formato string a formato Date
 * @param {string} dateString Fecha en formato string
 * @throws {Error} Si la fecha no es valida
 * @returns {Date}
 */
export function dateStringConvertion(dateString) {
  /** Primer parseo de fecha por constructor*/
  let date = new Date(dateString);
  if (!date.getTime()) {
    /** Segundo parseo de fecha por formato 'YYYY/MM/DD'*/
    const [day, month, year] = dateString.split("/").map(Number);
    date = new Date(year, month - 1, day);
    if (!date.getTime())
      throw new Error("Formato de fecha no valido: YYYY/MM/DD");
  }

  return date;
}
