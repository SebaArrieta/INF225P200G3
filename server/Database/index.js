const mongoose = require("mongoose");

const MONGO_URL = "mongodb+srv://sebastianarrieta123:bdpass@proyectobd.4f2owgn.mongodb.net/"

const db = async () =>{
    try {
        const conn = await mongoose.connect(MONGO_URL);
        console.log("coneccion completada");
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;
