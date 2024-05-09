const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/pacienteController");
const personalController = require("../controllers/personalController");
const horaController = require("../Controllers/horaController");

// Rutas para el registro de pacientes
router.post("/registrar-paciente", pacienteController.registrarPaciente);

// Rutas para el registro de personal
router.post("/registrar-personal", personalController.registrarPersonal);

router.get("/record/getDate/", horaController.buscarFecha);

router.post("/record/add", horaController.añadirHora);

router.get("/record/getHora/", horaController.buscarHora);

router.get("/record/getStats/", personalController.generarEstadisticas)

router.get("/record/getMed/", personalController.obtenerMedicos)

module.exports = router;
