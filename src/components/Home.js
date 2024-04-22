import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

function Home() {
  return (
    <html className='container'>
      <h1>Inicio</h1>
      <Link to="/register">Registrar hora</Link><br/>
      <Link to="/registerPaciente">Registrar paciente</Link><br/>
      <Link to="/registerMedico">Registrar medico</Link><br/>
      <Link to="/verHora">Buscar hora registrada</Link><br/>
      <Link to="/Estadisticas">Generar Estadisticas</Link>
    </html>
  );
}

export default Home;
