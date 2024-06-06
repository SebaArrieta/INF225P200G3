const express = require("express");
const router = express.Router();
const multer = require('multer');
const pacienteController = require("../Controllers/pacienteController");
const personalController = require("../Controllers/personalController");
const horaController = require("../Controllers/horaController");
const licenciaController = require("../Controllers/licenciaController");

//almacenamiento multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Carpeta donde se almacenarán los archivos
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
    },
  });
  
  const upload = multer({ storage: storage });
// Ruta para manejar la carga del archivo
router.post('/registrar-licencia', upload.single('file'), async (req, res) => {
    const { rut, nombre, apellido, fechaInicio, fechaTermino } = req.body;
    const filePath = req.file.path; // Ruta del archivo cargado
  
    // Aquí puedes guardar los datos en la base de datos, incluyendo la ruta del archivo
    const licencia = new Licencia({
      rut,
      nombre,
      apellido,
      fechaInicio,
      fechaTermino,
      archivo: filePath,
    });
  
    try {
      await licencia.save();
      res.status(200).json({ message: 'Licencia registrada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar la licencia', error });
    }
  });

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
