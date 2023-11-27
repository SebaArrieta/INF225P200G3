const mongoose = require("mongoose");

const personalSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  rut: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  tipoSangre: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  genero: { type: String, required: true },
  cargo: { type: String, required: true },
  especialidad: { type: String },
});

const Personal = mongoose.model("Personal", personalSchema);

module.exports = Personal;
