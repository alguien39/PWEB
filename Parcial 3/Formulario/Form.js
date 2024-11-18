const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
const folder = path.join(__dirname, 'archivos');
const upload = multer({ dest: folder });
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/Formulario", upload.single('archivo'), (req, res) => {
    try{
        if (req.file) {
            console.log(`Archivo recibido: ${req.file.originalname}`);
            console.log('Hola ' + req.body.Nombre);
            res.send(`Archivo recibido: ${req.file.originalname}  Hola ${req.body.Nombre}`);
        } 
        else {
            throw "No Se proporciono Un Archivo";
        }
    }
    catch (err) {
        res.status(400).send("Error:" + err);
    }
});

app.listen(3030, () => {
    console.log("Aplicación Escuchando en el puerto 3030");
});