import React, { useState } from "react";
import "../Styles/RegistroMedicos.css";

function RegistrarMedicos() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [tipoSangre, setTipoSangre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [genero, setGenero] = useState("");
  const [cargo, setCargo] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  // Otros campos que puedas considerar importante para el registro de médicos

  const tipoSangreOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const cargosOptions = ["Médico", "Enfermera", "Secretaria"];

  // Resto del código sigue igual

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/registrar-personal",
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
            cargo,
            especialidad,
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

  const handleCargoChange = (e) => {
    const selectedCargo = e.target.value;
    setCargo(selectedCargo);

    // Si el cargo es "Médico", muestra el campo de especialidad
    if (selectedCargo === "Médico") {
      setEspecialidad(""); // Reinicia el valor de especialidad al cambiar el cargo
    }
  };

  return (
    <div className="container">
      <h2>Registrar Personal</h2>
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
          <label>Fecha de Nacimiento:</label>
          <div className="input-container">
            <input
              type="date"
              className="form-control"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Tipo de Sangre:</label>
          <select
            className="form-control"
            value={tipoSangre}
            onChange={(e) => setTipoSangre(e.target.value)}
            required>
            <option value="">Selecciona un tipo de sangre</option>
            {tipoSangreOptions.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <div className="input-container">
            <input
              type="text"
              className="form-control"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Número de Teléfono:</label>
          <div className="input-container">
            <input
              type="tel"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Género:</label>
          <select
            className="form-control"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required>
            <option value="">Selecciona el género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        <div className="form-group">
          <label>Cargo:</label>
          <select
            className="form-control"
            value={cargo}
            onChange={handleCargoChange}
            required>
            <option value="">Selecciona un cargo</option>
            {cargosOptions.map((cargoOption, index) => (
              <option key={index} value={cargoOption}>
                {cargoOption}
              </option>
            ))}
          </select>
        </div>
        {cargo === "Médico" && (
          <div className="form-group">
            <label>Especialidad:</label>
            <div className="input-container">
              <input
                type="text"
                className="form-control"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                required
              />
            </div>
          </div>
        )}
        {/* Otros campos que hayas agregado */}
        {/* ... */}
        <button type="submit" className="btn btn-primary">
          Registrar Personal
        </button>
      </form>
    </div>
  );
}

export default RegistrarMedicos;
