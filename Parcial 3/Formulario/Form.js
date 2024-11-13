const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const folder = path.join(__dirname, 'archivos');
const upload = multer({ dest: folder });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/Formulario", upload.single('archivo'), (req, res) => {
    if (req.file) {
        console.log(`Archivo recibido: ${req.file.originalname}`);
        console.log('Hola ' + req.body.Nombre);
    } else {
        console.log("No se recibió ningún archivo.");
    }
});

app.listen(3000, () => {
    console.log("Aplicación Escuchando en el puerto 3000");
});