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
    { tipo: "Radiografía", duracion: 15 },
    { tipo: "Resonancia Magnética", duracion: 60 },
    { tipo: "Ecografías", duracion: 20 },
    { tipo: "Tomografías (TAC)", duracion: 40 },
  ];

  const getHorasDisponibles = async (fecha) => {
    const duracion = examenOptions.find(
      (examen) => examen.tipo === tipoExamen
    ).duracion;

    const horas = [];

    let hora = new Date(fecha);
    hora.setHours(8, 30, 0, 0); // Inicia a las 8:30hr

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
      
      let limit = 13
      while (hora.getHours() < limit) {
        if(!horasRegistradas.includes(hora.toISOString())){
          horas.push({
            value: hora.toISOString(),
            label: hora.toLocaleTimeString(),
          });
        }
        hora.setMinutes(hora.getMinutes() + duracion);
        if(hora.getHours() === 13){
          hora.setHours(14, 15, 0, 0);
          limit = 17;
        }
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
          <label htmlFor="nombre">Nombre:</label>
          <div className="input-container">
            <input
              type="text"
              id = "nombre"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <div className="input-container">
            <input
              type="text"
              id = "apellido"
              className="form-control"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="rut">RUT (sin guión ni puntos):</label>
          <div className="input-container">
            <input
              type="text"
              id = "rut"
              className="form-control"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              pattern="^\d{1,8}-?[\dk]?$"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tipo">Tipo de Examen:</label>
          <select
            className="form-control"
            id="tipo"
            value={tipoExamen}
            onChange={(e) => {
                setTipoExamen(e.target.value)
                setFecha("")
              }
            }
            required>
            <option value="">Selecciona un tipo de examen</option>
            {examenOptions.map((examen, index) => (
              <option key={examen.tipo} value={examen.tipo}>
                {examen.tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fecha">Fecha:</label>
          <div className="input-container">
            <input
              disabled={!tipoExamen}
              type="date"
              id = "fecha"
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
          <label htmlFor="hora">Hora:</label>
          <select
            disabled={!fecha}
            className="form-control"
            value={Hora}
            onChange={(e) => setFechaHora(e.target.value)}
            required>
            <option id = "hora" value="">Selecciona una hora</option>
            {horasDisponibles.map((hora, index) => (
              <option key={hora.label} value={hora.value}>
                {hora.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="nombreMedico">Nombre del Médico:</label>
          <div className="input-container">
            <input
              type="text"
              id = "nombreMedico"
              className="form-control"
              value={nombreMedico}
              onChange={(e) => setNombreMedico(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="observacion">Observación del Examen:</label>
          <textarea
            className="form-control fixed-textarea"
            id = "observacion"
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
