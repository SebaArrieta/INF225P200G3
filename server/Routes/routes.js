const express = require("express");
const router = express.Router();
const pacienteController = require("../Controllers/pacienteController");
const personalController = require("../Controllers/personalController");
const horaController = require("../Controllers/horaController");
const licenciaController = require("../Controllers/licenciaController");
// Rutas para el registro de pacientes
router.post("/registrar-paciente", pacienteController.registrarPaciente);

// Rutas para el registro de personal
router.post("/registrar-personal", personalController.registrarPersonal);

router.get("/record/getDate/", horaController.buscarFecha);

router.post("/record/add", horaController.añadirHora);

router.get("/record/getHora/", horaController.buscarHora);

router.get("/record/getStats/", personalController.generarEstadisticas);

router.get("/record/getMed/", personalController.obtenerMedicos);

router.post("/registrar-licencia",licenciaController.registrarLicencia);

module.exports = router;
