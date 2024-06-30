require('dotenv').config();
const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGODB_URI

const db = async () =>{
    try {
        await mongoose.connect(MONGO_URL);
        console.log("conexion completada");
    } catch (error) {
        console.log(error)
    }
}

module.exports = db;
