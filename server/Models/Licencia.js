const mongoose = require("mongoose");
let licenciaSchema = new mongoose.Schema({
    rut: Number,
    nombre: String,
    apellido: String,
    fechaInicio: Date,
    fechaTermino: Date,
});
const licencia = mongoose.model('licencia', licenciaSchema);

module.exports = licencia;