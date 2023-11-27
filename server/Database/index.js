const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://sebastianarrieta123:proyectobd@bdproyecto.2cqloin.mongodb.net/?retryWrites=true&w=majority"

const db = async () =>{
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log("coneccion completada");
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;