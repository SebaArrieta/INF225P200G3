import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/DisponibilidadPersonal.css";

const PersonalItem = ({ personal }) => (
  <div>
    <p>Nombre: {personal.nombre}</p>
    <p>Apellido: {personal.apellido}</p>
    <p>Cargo: {personal.cargo}</p>
    <p>Especialidad: {personal.especialidad}</p>
  </div>
);

const DispPersonal = () => {
  const [originalPersonalList, setOriginalPersonalList] = useState([]);
  const [personalList, setPersonalList] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(false);
  const [nombreMedico, setNombreMedico] = useState(""); // Estado para almacenar el nombre del médico

  useEffect(() => {
    const fetchPersonal = async () => {
      try {
        const response = await axios.get("http://localhost:5000/record/getMed/");
        setOriginalPersonalList(response.data);
      } catch (error) {
        console.error("Error al obtener el personal:", error);
      }
    };

    fetchPersonal();
  }, []);

  const filtrarPersonal = () => {
    if (filtro === "") {
      setPersonalList(originalPersonalList); // Mostrar todos los elementos
    } else {
      const filteredPersonal = originalPersonalList.filter(personal => personal.cargo === filtro);
      setPersonalList(filteredPersonal);
    }
    setFiltroSeleccionado(true);
  };

  const handleFileChange = (e) => {
    // Manejar la carga del archivo PDF aquí
    const file = e.target.files[0];
    console.log("Archivo seleccionado:", file);
  };

  const handleNombreMedicoChange = (e) => {
    // Actualizar el estado del nombre del médico
    setNombreMedico(e.target.value);
  };

  return (
    <div className="container">
      <div>
        <h2>Disponibilidad de Personal</h2>
        <h3>Cargar Licencia Médica</h3>
        <form>
          <div className="form-group">
            <label htmlFor="nombreMedico">Nombre del Médico:</label>
            <input
              type="text"
              id="nombreMedico"
              className="form-control"
              value={nombreMedico}
              onChange={handleNombreMedicoChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaInicio">Fecha de Inicio:</label>
            <input type="date" id="fechaInicio" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="fechaFin">Fecha de Fin:</label>
            <input type="date" id="fechaFin" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="documento">Cargar Documento PDF:</label>
            <input type="file" id="documento" className="form-control-file" onChange={handleFileChange} />
          </div>
          <button type="submit" className="btn btn-primary">Cargar Licencia</button>
        </form>
      </div>
      <h3>Personal disponible</h3>
      <form>
        <div className="form-group">
          <label htmlFor="filtro">Filtrar por:</label>
          <select
            id="filtro"
            className="form-control"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="">Todos</option>
            <option value="Médico">Médico</option>
            <option value="Enfermera">Enfermera</option>
          </select>
        </div>
        <button type="button" className="btn btn-primary" onClick={filtrarPersonal}>Filtrar</button>
      </form>
      {filtroSeleccionado ? (
        personalList.length > 0 ? (
          personalList.map((personal) => (
            <PersonalItem key={personal._id} personal={personal} />
          ))
        ) : (
          <p>No hay personal disponible para el filtro seleccionado.</p>
        )
      ) : null}
    </div>
  );
};

export default DispPersonal;
