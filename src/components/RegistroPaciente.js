import React, { useState } from "react";
import "../Styles/RegistroPaciente.css";

function RegistrarPacientes() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [tipoSangre, setTipoSangre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [genero, setGenero] = useState("");

  // Otros campos que puedas considerar importante para el registro de pacientes

  const tipoSangreOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Resto del código sigue igual

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/registrar-paciente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre,
            apellido,
            rut,
            fechaNacimiento,
            tipoSangre,
            direccion,
            telefono,
            genero,
          }),
        }
      );

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      // Puedes realizar acciones adicionales después de enviar los datos
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  return (
    <div className="container">
      <h2>Registrar Paciente</h2>
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
          <label htmlFor="fechaNac">Fecha de Nacimiento:</label>
          <div className="input-container">
            <input
              type="date"
              id = "fechaNac"
              className="form-control"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tipoS">Tipo de Sangre:</label>
          <select
            id = "tipoS"
            className="form-control"
            value={tipoSangre}
            onChange={(e) => setTipoSangre(e.target.value)}
            required>
            <option value="">Selecciona un tipo de sangre</option>
            {tipoSangreOptions.map((tipo, index) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dir">Dirección:</label>
          <div className="input-container">
            <input
              type="text"
              id = "dir"
              className="form-control"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="tel">Número de Teléfono:</label>
          <div className="input-container">
            <input
              type="tel"
              id = "tel"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="genero">Género:</label>
          <select
            className="form-control"
            id = "genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required>
            <option value="">Selecciona el género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        {/* Otros campos que hayas agregado */}
        {/* ... */}
        <button type="submit" className="btn btn-primary">
          Registrar Paciente
        </button>
      </form>
    </div>
  );
}

export default RegistrarPacientes;
