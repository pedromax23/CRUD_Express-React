const express = require ("express");
const app = express();
const path = require("path");
const override= require("method-override"); //para poder usar los metodos PUT y DELETE
const session = require('express-session'); // Requerimos express-session
const cookies = require('cookie-parser'); // Requerimos cookie-parser
const cors = require('cors')
app.use(cors())


app.use(express.static(path.resolve(__dirname, "../public"))); // Archivos estaticos

//Configuracion
app.use(express.urlencoded({extended:false})); //para tomar los datos del formulario
app.use(express.json()); //para tomar los datos del formulario
app.use(override("_method")) //para poder usar los metodos PUT y DELETE

// Configuracion de Session
app.use(session({
    secret: "Mensaje secreto",
    resave: false,
    saveUninitialized: true
}));

app.use(cookies());

// API
const dataLibros = require("./routes/dataLibros");
const dataGeneros = require("./routes/dataGeneros.js");
app.use('/api/dataLibros', dataLibros)
app.use('/api/dataGeneros', dataGeneros)


app.listen(5555, () => console.log("Servidor corriendo en el puerto: http://localhost:5555/"));