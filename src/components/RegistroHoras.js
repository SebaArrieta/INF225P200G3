import React, { useState } from "react";
import axios from 'axios';
import "../Styles/RegistroHoras.css";

function RegistrarHoras() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [Hora, setFechaHora] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipoExamen, setTipoExamen] = useState("");
  const [nombreMedico, setNombreMedico] = useState("");
  const [observacionExamen, setobservacionExamen] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [mensaje, setmensaje] = useState("");

  const examenOptions = [
    { tipo: "Radiografía", duracion: 30 },
    { tipo: "Escáner", duracion: 60 },
    { tipo: "Ecografía", duracion: 30 },
    { tipo: "Resonancia Magnética", duracion: 90 },
  ];

  const getHorasDisponibles = async (fecha) => {
    const duracion = examenOptions.find(
      (examen) => examen.tipo === tipoExamen
    ).duracion;

    const horas = [];

    let hora = new Date(fecha);
    //hora.setHours(8, 0, 0, 0); // Inicia a las 8:00hr

    try {
      const response = await axios.get('http://localhost:5000/record/getDate/',{
        params: {
          date: hora.toISOString(),
          tipo: tipoExamen
        }});

      let horasRegistradas = [];

      response.data.map((res) =>{
        let date = new Date(res.fechaHora);
        horasRegistradas.push(date.toISOString())
      });

      while (hora.getHours() < 12) {
        if(!horasRegistradas.includes(hora.toISOString())){
          horas.push({
            value: hora.toISOString(),
            label: hora.toLocaleTimeString(),
          });
        }
        hora.setMinutes(hora.getMinutes() + duracion);
      }

      setHorasDisponibles(horas);
    } catch (error) {
      console.log(error);
    }
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    let postData = {
      nombre: nombre,
      apellido: apellido,
      rut: rut,
      Hora: Hora,
      tipoExamen: tipoExamen,
      nombreMedico: nombreMedico,
      observacionExamen: observacionExamen
    };
    try {
      const response = await axios.post('http://localhost:5000/record/add', postData);
      console.log(response);
      setmensaje(response.message);
      setFecha("");
      setFechaHora("");
      setHorasDisponibles([]);

    } catch (error) {
      console.log(error);
    }
    
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
            onChange={(e) => {
                setTipoExamen(e.target.value)
                setFecha("")
              }
            }
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
          <label>Fecha:</label>
          <div className="input-container">
            <input
              disabled={!tipoExamen}
              type="date"
              className="form-control"
              value={fecha}
              onChange={(e) => {
                  setFecha(e.target.value);
                  getHorasDisponibles(e.target.value+"T08:00:00.000")
                }
              }
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Hora:</label>
          <select
            disabled={!fecha}
            className="form-control"
            value={Hora}
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
          <label>Observación del Examen:</label>
          <textarea
            className="form-control fixed-textarea"
            value={observacionExamen}
            onChange={(e) => setobservacionExamen(e.target.value)}
            required
          />
        </div>
        {/* Resto del formulario sigue igual */}
        {/* ... */}
        <button type="submit" className="btn btn-primary">
          Registrar Hora
        </button>
      </form>
      <p>
        {mensaje}
      </p>
    </div>
  );
}


export default RegistrarHoras;
