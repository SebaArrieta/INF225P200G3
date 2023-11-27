import { Container } from "react-bootstrap";
import "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import RegistrarHoras from "./components/RegistroHoras";
import VerHora from "./components/VerHora";
import RegistrarPaciente from "./components/RegistroPaciente";
import RegistrarMedicos from "./components/RegistroMedicos";

function App() {
  return (
    <>
      <Container className="mb-4">
        <main className="main-content form-signin w-100 m-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegistrarHoras />} />
            <Route path = "/verHora" element={<VerHora />}/>
            <Route path = "/registerPaciente" element={<RegistrarPaciente />}/>
            <Route path = "/registerMedico" element={<RegistrarMedicos />}/>
          </Routes>
        </main>
      </Container>
    </>
  );
}

export default App;
