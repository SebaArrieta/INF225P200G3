const Personal = require("../models/Personal");

// Controlador para registrar nuevo personal
exports.registrarPersonal = async (req, res) => {
  try {
    const nuevoPersonal = new Personal(req.body);
    const personalGuardado = await nuevoPersonal.save();
    res.status(201).json(personalGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el personal" });
  }
};