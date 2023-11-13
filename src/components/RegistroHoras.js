import React, { useState } from "react";
import "../Styles/RegistroHoras.css";

function RegistrarHoras() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [tipoExamen, setTipoExamen] = useState("");
  const [nombreMedico, setNombreMedico] = useState("");
  const [motivoExamen, setMotivoExamen] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  const examenOptions = [
    { tipo: "Radiografía", duracion: 30 },
    { tipo: "Escáner", duracion: 60 },
    { tipo: "Ecografía", duracion: 30 },
    { tipo: "Resonancia Magnética", duracion: 90 },
  ];

  const getHorasDisponibles = (duracion) => {
    const horas = [];
    let hora = new Date();
    hora.setHours(8, 0, 0, 0); // Inicia a las 8:00hr

    while (hora.getHours() < 12) {
      horas.push({
        value: hora.toISOString(),
        label: hora.toLocaleTimeString(),
      });
      hora.setMinutes(hora.getMinutes() + duracion);
    }

    return horas;
  };

  const handleTipoExamenChange = (e) => {
    const selectedTipoExamen = e.target.value;
    setTipoExamen(selectedTipoExamen);

    const duracionExamen = examenOptions.find(
      (examen) => examen.tipo === selectedTipoExamen
    ).duracion;
    const horasDisponibles = getHorasDisponibles(duracionExamen);
    setHorasDisponibles(horasDisponibles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", {
      nombre,
      apellido,
      rut,
      fechaHora,
      tipoExamen,
      nombreMedico,
      motivoExamen,
    });
  };

  return (
    <div className="container">
      <h2>Registrar Hora para Examen Médico</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <div className="input-container">
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            /> 
            </div>
          </div>
          <div className="form-group">
          <label>Apellido:</label>
          <div className="input-container">
            <input
              type="text"
              className="form-control"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>RUT (sin guión ni puntos):</label>
          <div className="input-container">
            <input
              type="text"
              className="form-control"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              pattern="^\d{1,8}-?[\dk]?$"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Tipo de Examen:</label>
          <select
            className="form-control"
            value={tipoExamen}
            onChange={handleTipoExamenChange}
            required>
            <option value="">Selecciona un tipo de examen</option>
            {examenOptions.map((examen, index) => (
              <option key={index} value={examen.tipo}>
                {examen.tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Fecha y Hora:</label>
          <select
            className="form-control"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
            required>
            <option value="">Selecciona una hora</option>
            {horasDisponibles.map((hora, index) => (
              <option key={index} value={hora.value}>
                {hora.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Nombre del Médico:</label>
          <div className="input-container">
            <input
              type="text"
              className="form-control"
              value={nombreMedico}
              onChange={(e) => setNombreMedico(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Motivo del Examen:</label>
          <textarea
            className="form-control fixed-textarea"
            value={motivoExamen}
            onChange={(e) => setMotivoExamen(e.target.value)}
            required
          />
        </div>
        {/* Resto del formulario sigue igual */}
        {/* ... */}
        <button type="submit" className="btn btn-primary">
          Registrar Hora
        </button>
      </form>
    </div>
  );
}

export default RegistrarHoras;
