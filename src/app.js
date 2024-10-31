import dotenv from "dotenv";
import express from "express";
import { createConnection } from "./config/connection.js";
import { configContainer } from "./config/dependencyInjection.js";
import { logger } from "./config/logger.js";
import { tasksRouter } from "./controllers/tasks.controller.js";
import { handleError } from "./errors/handleError.js";

/**
 * Inicializar las variables de entorno .env
 */
dotenv.config();

/**
 * Generar variables de entorno
 */
const PORT = process.env.API_PORT || 8000;
const HOST = process.env.API_HOST || "127.0.0.1";
const URI = process.env.API_MONGODB_URI || "mongodb://127.0.0.1:27017";

/**
 * Iniciar la aplicacion
 * 1) Conexión a la base de datos
 * 2) Configuración de la aplicación
 * 3) Inicio de la aplicación
 */
createConnection(URI)
  .then((connection) => {
    configContainer(connection);

    const app = express();

    /***
     * Middleware: json body parser
     */
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    /**
     * Middleware: Logger de informacion y peticiones
     */
    app.use((req, _res, next) => {
      logger.info(`Request ${req.method} ${req.url}`);
      return next();
    });

    /***
     * Middleware: Router de tareas
     */
    app.use("/tasks", tasksRouter);

    /***
     * Escuchar las peticiones
     */
    app.listen(PORT, HOST, () => {
      logger.info(`Listening on full address http://${HOST}:${PORT}`);
    });
  })
  .catch((e) => {
    handleError(e);
  });
