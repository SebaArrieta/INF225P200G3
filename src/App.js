import { Container } from "react-bootstrap";
import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import RegistrarHoras from "./components/RegistroHoras";
import VerHora from "./components/VerHora";
import RegistrarPaciente from "./components/RegistroPaciente";
import RegistrarMedicos from "./components/RegistroMedicos";
import Estadisticas from "./components/Estadisticas";
import DispPersonal from "./components/DisponibilidadPersonal";


function App() {
  return (
    <>
      <div className="mb-4">
        <main className="main-content form-signin w-100 m-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrarHoras />} />
            <Route path = "/verHora" element={<VerHora />}/>
            <Route path = "/registerPaciente" element={<RegistrarPaciente />}/>
            <Route path = "/registerMedico" element={<RegistrarMedicos />}/>
            <Route path = "/Estadisticas" element={<Estadisticas />}/>
            <Route path = "/DisponibilidadPersonal" element={<DispPersonal />}/>
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;

