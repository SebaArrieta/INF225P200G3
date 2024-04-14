import React, { useState } from "react";
import axios from 'axios';
import styles from "../Styles/Estadisticas.module.css";

function Estadisticas(){
    const [Dia, setDia] = useState("");
    const [Semana, setSemana] = useState("");
    const [Mes, setMes] = useState("");
    const [Año, setAño] = useState("2024");

    function handleSubmit(){
        return
    }

    return(
        <div>
            <div className={styles.container}>
                <h2>Generar Estadísticas</h2>
                <form className = {styles.form_container} onSubmit={handleSubmit}>
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
                                <button className="btn btn-primary">Ver Estadisticas</button>
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
                                <button className="btn btn-primary">Ver Estadisticas</button>
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
                                setSemana(e.target.value);
                                }
                            }
                            />
                            <div>
                                <button className="btn btn-primary">Ver Estadisticas</button>
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
                                <button className="btn btn-primary">Ver Estadisticas</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className={styles.container}>
                <h3>Estadísticas del dia/mes/semana/año</h3>

                <p>cantidad de atenciones: 18</p>
                <p>Radiografias: 3</p>
                <p>Ecografias: 5</p>
                <p>Tomografias(TAC): 8</p>
                <p>Resonancia Magnética: 2</p>
            </div>
        </div>
        
    )
}

export default Estadisticas