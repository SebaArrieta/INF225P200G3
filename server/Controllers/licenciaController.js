const licencia = require("../Models/Licencia");

// Controlador para registrar una licencia
exports.registrarLicencia = async (req, res) => {
  try {
    const nuevaLicencia = new licencia(req.body);
    const licenciaGuardada = await nuevaLicencia.save();
    res.status(201).json(licenciaGuardada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar la licencia" });
  }
};