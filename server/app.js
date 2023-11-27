const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const db = require("./Database");
const app = express();

app.set("port", process.env.PORT || 5000);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(require("./Routes/routes"));

db();

app.listen(app.get("port"), ()=>{
    console.log(`Servidor en el puerto ${app.get("port")}`)
})
