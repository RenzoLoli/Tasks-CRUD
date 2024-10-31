import mongoose from "mongoose";

/**
 * Esquema de tarea
 */
const taskSchema = new mongoose.Schema(
  {
    titulo: { type: String, min: 2, max: 50, required: true },
    descripcion: { type: String, min: 2, max: 400, required: true },
    estado: {
      type: String,
      required: true,
      match: /^(pendiente|en\ progreso|completada)$/,
    },
    fechaCreacion: { type: String, required: true },
    fechaVencimiento: { type: String, required: false },
  },
  {
    collection: "tasks",
  },
);

/**
 * Modelo de tarea
 */
const taskModel = mongoose.model("Task", taskSchema);

export { taskModel };
