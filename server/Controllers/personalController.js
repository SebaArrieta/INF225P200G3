const Personal = require("../models/Personal");
const horas = require("../models/horas")

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

const getHoras = async (tipo, init, end) => {
  const query = {
    fechaHora: {
      $gte: init,
      $lt: end,
    },
    tipoExamen: tipo
  };

  const result = await horas.countDocuments(query);
  return result;
}

exports.generarEstadisticas = async (req, res) => {
  try {
    let init;
    let end;

    switch (req.query.tipo) {
      case "Dia":
          init = new Date(req.query.rango);
          end = new Date(req.query.rango);

          end.setHours(23, 59, 59);
          console.log(init, end)
          break;
      case "Semana":
          break;
      case "Mes":
          
          break;
      case "Año":
          
          break;
  
      default:
          break;
  }

    res.json({
      "Radiografia": await getHoras("Radiografía", init, end),
      "Resonancia Magnética": await getHoras("Resonancia Magnética", init, end),
      "Ecografías": await getHoras("Ecografías", init, end),
      "Tomografías (TAC)": await getHoras("Tomografías (TAC)", init, end)
    });

  } catch (error) {
    console.error('Error counting documents:', error);
    throw error;
  }
}
