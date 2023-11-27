const horas = require("../Models/horas")

exports.buscarFecha = async(req, res) => {
    const targetDate = new Date(req.query.date);
  
    const startOfDay = new Date(targetDate);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);
  
    const query = horas.find({
      fechaHora: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      tipoExamen: req.query.tipo
    });
    
    query.exec()
      .then(results => {
        console.log(`Documents with myDateField on ${targetDate}:`, results);
        res.json(results);
      })
      .catch(err => {
        console.error('Error fetching documents:', err);
      });
  };
   
    exports.añadirHora = async(req, res) => {
      const newHora = new horas({
          rut: parseInt(req.body.rut),
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          fechaHora: new Date(req.body.Hora),
          tipoExamen: req.body.tipoExamen,
          nombreMedico: req.body.nombreMedico,
          observacionExamen: req.body.observacionExamen,
      });
      newHora.save()
      console.log("j");
      return res.json({message: "Hora reservada"});
  }; 
  
  exports.buscarHora = async(req, res) => {
    try {
      const hora = await horas.findById(req.query.id);
      if (!hora) {
        return res.status(404).json({ message: "Hora no encontrada" });
      }
      res.json(hora);
    } catch (err) {
      console.error('Error obteniendo la hora:', err);
      res.status(500).json({ message: "Error obteniendo la hora" });
    }
  };