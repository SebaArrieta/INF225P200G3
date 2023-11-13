import React, { useState } from "react";
import "../Styles/VerHora.css";

// Componente para mostrar la información de cada hora registrada
const HoraRegistrada = ({ hora }) => {
  return (
    <div>
      <p>ID: {hora.id}</p>
      <p>ID: {hora.rut}</p>
      <p>Fecha: {hora.fecha}</p>
      <p>Hora: {hora.hora}</p>
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

  const buscarHora = () => {
    if (idIngresado.trim() === "" && rutIngresado === "") {
      // Si no se ha ingresado ningún ID, no hacer nada
      return;
    }

    // Buscar la hora en el arreglo de horas registradas
    const horaEncontrada = horasRegistradas.find(
      (hora) => hora.id === idIngresado || hora.rut === rutIngresado
    );

    if (horaEncontrada) {
      setHoraEncontrada(horaEncontrada);
      setMostrarMensaje(false); // Ocultar el mensaje si se encuentra la hora
    } else {
      setHoraEncontrada(null);
      setMostrarMensaje(true); // Mostrar el mensaje si no se encuentra la hora
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
