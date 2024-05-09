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

  try {
    const result = await horas.countDocuments(query);
    return result;
  } catch (error) {
    throw error
  }
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
          break;
      case "Semana":
          init = new Date(req.query.rango);
          end = new Date();

          end.setDate(init.getDate() + 6);
          end.setHours(23, 59, 59);
          break;
      case "Mes":
          let month = req.query.rango.split("-")
          init = new Date(month[0], parseInt(month[1]) - 1, 1);
          end = new Date(month[0], parseInt(month[1]), 1);

          end.setDate(init.getDate() - 1);
          end.setHours(23, 59, 59);
          break;
      case "Año":
          let year = req.query.rango
          init = new Date(year, 0, 1);
          end = new Date(parseInt(year)+1, 0, 1);

          end.setDate(end.getDate() - 1);
          end.setHours(23, 59, 59);
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

exports.obtenerMedicos = async (res) => {
  try {
    const personal = await Personal.find({ cargo: { $in: ["Médico", "Enfermera"] } });

    res.json(personal);
  } catch (error) {
    console.error('Error al obtener el personal:', error);
  }
};