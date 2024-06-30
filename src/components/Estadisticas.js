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
    });
    const [total, setTotal] = useState("")
    const [isAuth, setIsAuth] = useState(false)
    const[Nombre, setNombre] = useState("")
    const[Pass, setPass] = useState("")
    const[errorLogIn, setErrorLogIn] = useState(null)

    const handleSubmit = async (tipo) =>{
        let init = "";
        switch (tipo) {
            case "Dia":
                init = new Date(Dia+"T04:00:00.000");
                break;
            case "Semana":
                let weekArr = Semana.split("-W");
                let dia = 1 + (parseInt(weekArr[1])-1) * 7;
                init = new Date(weekArr[0], 0, dia);
                break;
            case "Mes":
                init = Mes;
                break;
            case "Año":
                init = Año;
                break;
            default:
                break;
        }

        try {
            const response = await axios.get(`http://localhost:5000/record/getStats/`,{
            params: {
                tipo: tipo,
                rango: init
            }});
        
            setStats(response.data)
            setmostrarStats(true)
            setTotal(parseInt(response.data["Radiografia"]) + parseInt(response.data["Ecografías"])+ parseInt(response.data["Tomografías (TAC)"]) + parseInt(response.data["Resonancia Magnética"]))
            console.log("Respuesta del servidor:", stats);
            // Puedes realizar acciones adicionales después de enviar los datos
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            // Manejar el error, mostrar un mensaje al usuario, etc.
        }
    }

    const logIn = () => {
        if(Nombre === "Usuario" && Pass === "1234"){
            setIsAuth(true)
        }else{
            setErrorLogIn("Credenciales incorrectas")
        }
    }

    return(
        <div>
            {!isAuth ? (
            <div>
                <div className="container">
                <h2>Ingresar credenciales</h2>
                <label>
                    Nombre:
                    <input
                    type="text"
                    value={Nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                    type="password"
                    value={Pass}
                    onChange={(e) => setPass(e.target.value)}
                    />
                </label>
                <button onClick={logIn}>Ingresar</button>
                </div>
                {errorLogIn ? (
                    <p className="no-encontrado">
                        {errorLogIn}
                    </p>
                ): null}
            </div>
            ) : (
            <div>
                <div className={styles.container}>
                <h2>Generar Estadísticas</h2>
                <div className = {styles.form_container}>
                    <div className="form-group">
                        <label htmlFor="dia">Dia:</label>
                        <div className="input-container">
                            <input
                            type="date"
                            id = "dia"
                            className="form-control"
                            onChange={(e) => {
                                setDia(e.target.value);
                                }
                            }
                            />
                            <div>
                                <button onClick = {() => Dia != "" ? handleSubmit("Dia") : setmostrarStats(false)} className="btn btn-primary">Ver Estadisticas</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="semana">Semana:</label>
                        <div className="input-container">
                            <input
                            type="week"
                            id = "semana"
                            className="form-control"
                            onChange={(e) => {
                                setSemana(e.target.value);
                                }
                            }
                            />
                            <div>
                                <button onClick = {() => Semana != "" ? handleSubmit("Semana") : setmostrarStats(false)} className="btn btn-primary">Ver Estadisticas</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="mes">Mes:</label>
                        <div className="input-container">
                            <input
                            type="month"
                            id = "mes"
                            className="form-control"
                            min="1900-01" max="2024-12"
                            onChange={(e) => {
                                setMes(e.target.value);
                                }
                            }
                            />
                            <div>
                                <button onClick = {() => Mes != "" ? handleSubmit("Mes") : setmostrarStats(false)} className="btn btn-primary">Ver Estadisticas</button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="año">Año:</label>
                        <div className="input-container">
                            <input 
                                type="number" 
                                id = "año"
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
                                <button onClick = {() => Año != "" ? handleSubmit("Año") : setmostrarStats(false)} className="btn btn-primary">Ver Estadisticas</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {mostrarStats ? (
                <div className={styles.container}>
                    <h3>Estadísticas:</h3>

                    <h4>cantidad de atenciones: {total}</h4>
                    <p>Radiografias: {stats["Radiografia"]}</p>
                    <p>Ecografias: {stats["Ecografías"]}</p>
                    <p>Tomografias(TAC): {stats["Tomografías (TAC)"]}</p>
                    <p>Resonancia Magnética: {stats["Resonancia Magnética"]}</p><br/>

                    <h4>Porcentajes</h4>
                    <p>Radiografias: {(parseInt(stats["Radiografia"])*(100/total)).toFixed(2)}%</p>
                    <p>Ecografias: {(parseInt(stats["Ecografías"])*(100/total)).toFixed(2)}%</p>
                    <p>Tomografias(TAC): {(parseInt(stats["Tomografías (TAC)"])*(100/total)).toFixed(2)}%</p>
                    <p>Resonancia Magnética: {(parseInt(stats["Resonancia Magnética"])*(100/total)).toFixed(2)}%</p><br/>
                </div>
            ): null}
            </div>
            )}
        </div>
        
    )
}

export default Estadisticas
