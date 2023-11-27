const mongoose = require("mongoose");

const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  rut: { type: String, required: true, unique: true },
  fechaNacimiento: { type: Date, required: true },
  tipoSangre: { type: String, required: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  genero: { type: String, required: true },
});

const Paciente = mongoose.model("Paciente", pacienteSchema);

module.exports = Paciente;
