import { logger } from "./logger.js";
import { MongoDbError } from "../errors/database.error.js";
import mongoose from "mongoose";

/**
 * Conectar a la base de datos
 * @param {string} uri Url de la base de datos
 * @throws {MongoDbError}
 * @returns {Promise<MongoClient>}
 */
const createConnection = async (uri) => {
  try {
    const connection = await mongoose.connect(uri, {
      dbName: "tasks",
    });

    connection.connection.on("error", (err) => {
      logger.info(`Conexion a base de datos fallida -> ${err}`);
    });

    connection.connection.on("connected", () => {
      logger.info(`Conexion a base de datos establecida`);
    });

    connection.connection.on("disconnected", () => {
      logger.info(`Conexion a base de datos cerrada`);
    });

    return connection;
  } catch (e) {
    throw new MongoDbError(e.message);
  }
};

export { createConnection };
