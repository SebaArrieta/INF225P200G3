import React, { useState } from "react";
import axios from "axios"; // Importa axios
import "../Styles/VerHora.css";

// Componente para mostrar la información de cada hora registrada
const HoraRegistrada = ({ hora }) => {
  let horaformat = new Date(hora.fechaHora);
  return (
    <div>
      <p>ID: {hora._id}</p>
      <p>Rut: {hora.rut}</p> 
      <p>Nombre: {hora.nombre}</p> 
      <p>Apellido: {hora.apellido}</p> 
      <p>Fecha y Hora: {horaformat.toLocaleString()}</p>
      <p>Médico: {hora.nombreMedico}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

// Componente principal que permite introducir un ID y muestra la hora correspondiente
const VerHora = ({ horasRegistradas }) => {
  const [idIngresado, setIdIngresado] = useState("");
  const [rutIngresado, setRutIngresado] = useState("");
  const [horaEncontrada, setHoraEncontrada] = useState(null);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const buscarHora = async () => { // Define la función como async para usar await

    if (idIngresado.trim() === "" && rutIngresado === "") {
      // Si no se ha ingresado ningún ID, no hacer nada
      return;
    }

    try {
      // Realiza la petición GET al backend con la ID ingresada
      const response = await axios.get(`http://localhost:5000/record/getHora/`,{
        params: {
          id: idIngresado
        }});

      // Actualiza el estado con la hora encontrada
      setHoraEncontrada(response.data);
      setMostrarMensaje(false); // Ocultar el mensaje si se encuentra la hora
    } catch (error) {
      console.error('Error al buscar la hora:', error);
      setHoraEncontrada(null);
      setMostrarMensaje(true); // Muestra el mensaje si ocurre un error o no se encuentra la hora
    }
  };

  return (
    <div>
      <h2>Buscar Hora Registrada</h2>
      <label>
        Ingrese el ID de su hora:
        <input
          type="text"
          value={idIngresado}
          onChange={(e) => setIdIngresado(e.target.value)}
        />
      </label>
      <label>
        Ingrese su rut:
        <input
          type="text"
          value={rutIngresado}
          onChange={(e) => setRutIngresado(e.target.value)}
        />
      </label>
      <button onClick={buscarHora}>Buscar</button>

      {horaEncontrada ? (
        <div>
          <h3>Información de la Hora Registrada</h3>
          <HoraRegistrada hora={horaEncontrada} />
        </div>
      ) : mostrarMensaje ? (
        <p className="no-encontrado">
          No se encontró ninguna hora con el ID ingresado.
        </p>
      ) : null}
    </div>
  );
};

export default VerHora;
