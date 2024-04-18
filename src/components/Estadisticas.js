import React, { useState } from "react";
import axios from 'axios';
import styles from "../Styles/Estadisticas.module.css";

function Estadisticas(){
    const [Dia, setDia] = useState("");
    const [Semana, setSemana] = useState("");
    const [Mes, setMes] = useState("");
    const [Año, setAño] = useState("");
    const [mostrarStats, setmostrarStats] = useState(false)
    const [stats, setStats] = useState({
        "Radiografia": 0,
        "Resonancia Magnética": 0,
        "Ecografías": 0,
        "Tomografías (TAC)": 0
    })

    const handleSubmit = async (tipo) =>{
        var rango = "";
        switch (tipo) {
            case "Dia":
                rango = new Date(Dia+"T04:00:00.000")
                break;
            case "Semana":
                rango = Semana
                break;
            case "Mes":
                rango = Mes
                break;
            case "Año":
                rango = Año
                break;
        
            default:
                break;
        }

        try {
            const response = await axios.get(`http://localhost:5000/record/getStats/`,{
            params: {
                tipo: tipo,
                rango: rango
            }});
      
            setStats(response.data)
            setmostrarStats(true)
            console.log("Respuesta del servidor:", stats);
            // Puedes realizar acciones adicionales después de enviar los datos
            } catch (error) {
                console.error("Error al enviar los datos:", error);
                // Manejar el error, mostrar un mensaje al usuario, etc.
            }
    }

    return(
        <div>
            <div className={styles.container}>
                <h2>Generar Estadísticas</h2>
                <div className = {styles.form_container}>
                    <div className="form-group">
                        <label>Dia:</label>
                        <div className="input-container">
                            <input
                            type="date"
                            className="form-control"
                            onChange={(e) => {
                                setDia(e.target.value);
                                }
                            }
                            />
                            <div>
                                <button onClick = {() => handleSubmit("Dia")} className="btn btn-primary">Ver Estadisticas</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Semana:</label>
                        <div className="input-container">
                            <input
                            type="week"
                            className="form-control"
                            onChange={(e) => {
                                setSemana(e.target.value);
                                }
                            }
                            />
                            <div>
                                <button onClick = {() => handleSubmit("Semana")} className="btn btn-primary">Ver Estadisticas</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Mes:</label>
                        <div className="input-container">
                            <input
                            type="month"
                            className="form-control"
                            min="1900-01" max="2024-12"
                            onChange={(e) => {
                                setMes(e.target.value);
                                }
                            }
                            />
                            <div>
                                <button onClick = {() => handleSubmit("Mes")} className="btn btn-primary">Ver Estadisticas</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Año:</label>
                        <div className="input-container">
                            <input 
                                type="number" 
                                min="1900"
                                max="2024" 
                                step="1" 
                                value={Año} 
                                onChange={(e) => {
                                    setAño(e.target.value);
                                    }
                                }
                            />
                            <div>
                                <button onClick = {() => handleSubmit("Año")} className="btn btn-primary">Ver Estadisticas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {mostrarStats ? (
                <div className={styles.container}>
                    <h3>Estadísticas del dia/mes/semana/año</h3>

                    <p>cantidad de atenciones: {parseInt(stats["Radiografia"]) + parseInt(stats["Ecografías"])+ parseInt(stats["Tomografías (TAC)"]) + parseInt(stats["Resonancia Magnética"])}</p>
                    <p>Radiografias: {stats["Radiografia"]}</p>
                    <p>Ecografias: {stats["Ecografías"]}</p>
                    <p>Tomografias(TAC): {stats["Tomografías (TAC)"]}</p>
                    <p>Resonancia Magnética: {stats["Resonancia Magnética"]}</p>
                </div>
            ): null}
        </div>
        
    )
}

export default Estadisticas
