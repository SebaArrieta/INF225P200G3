const mongoose = require("mongoose");
let horaSchema = new mongoose.Schema({
    rut: Number,
    nombre: String,
    apellido: String,
    fechaHora: Date,
    tipoExamen: String,
    nombreMedico: String,
    observacionExamen: String,
});
const hora = mongoose.model('horas', horaSchema);

module.exports = hora;