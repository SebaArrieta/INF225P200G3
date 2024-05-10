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
  
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaTermino, setFechaTermino] = useState(""); 

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
    // Manejar la carga del archivo PDF aquí aun no cargamos nada a bd
    const file = e.target.files[0];
    console.log("Archivo seleccionado:", file);
  };

  const handleLicenciaSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/registrar-licencia", 
        {
          rut,
          nombre,
          apellido,
          fechaInicio,
          fechaTermino,
        }      
      );

      const data = response.data;
      console.log("Respuesta del servidor:", data);
      // Aquí puedes realizar alguna acción adicional después de que se haya registrado la licencia
    } catch (error) {
      console.error("Error al registrar la licencia:", error);
      // Aquí puedes manejar el error de alguna manera
    }
  };

  return (
    <div className="container">
      <div>
        <h2>Disponibilidad de Personal</h2>
        <h3>Cargar Licencia Médica</h3>
        <form onSubmit={handleLicenciaSubmit}>
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
            <label htmlFor="nombreMedico">Nombre:</label>
            <input
              type="text"
              id="nombreMedico"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellidomed">Apellido:</label>
            <input
              type="text"
              id="apellidomed"
              className="form-control"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaInicio">Fecha de Inicio:</label>
            <input
            type="date"
            id="fechaInicio"
            className="form-control"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="fechaTermino">Fecha de Termino:</label>
            <input 
              type="date"
              id="fechaFin"
              className="form-control" 
              value={fechaTermino}
              onChange={(e) => setFechaTermino(e.target.value)} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="documento">Cargar Documento PDF:</label>
            <input 
              type="file"
              id="documento"
              className="form-control-file"
              onChange={handleFileChange} />
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
            <option value="Secretaria">Secretaria</option>
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
