const Paciente = require("../models/Paciente");

// Controlador para registrar un nuevo paciente
exports.registrarPaciente = async (req, res) => {
  try {
    const nuevoPaciente = new Paciente(req.body);
    const pacienteGuardado = await nuevoPaciente.save();
    res.status(201).json(pacienteGuardado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el paciente" });
  }
};
