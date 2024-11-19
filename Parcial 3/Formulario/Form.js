const express = require("express");
const path = require("path");
const multer = require("multer");
const pdf = require("pdfkit");
const fs = require("fs");
const cors = require("cors");

const app = express();
const folder = path.join(__dirname, "archivos");

// Configuración de almacenamiento personalizado con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folder); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        // Guardar el archivo con su nombre original
        cb(null, file.originalname);
    },
});

// Inicializar Multer con la configuración personalizada
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Endpoint para manejar la creación del PDF
app.post("/Formulario", upload.single("archivo"), (req, res) => {
    try {
        if (req.file) {
            console.log(`Archivo recibido: ${req.file.originalname}`);
            console.log(`Hola ${req.body.Nombre}`);
            
            // Crear un archivo PDF
            const doc = new pdf();
            const pdfPath = path.join(folder, `${req.body.Nombre}.pdf`);
            const pdfStream = fs.createWriteStream(pdfPath);

            // Escribir contenido al PDF
            doc.pipe(pdfStream);
            doc
                .fontSize(45)
                .fillColor("blue")
                .text(`Pdf creado. Su nombre es: ${req.body.Nombre}`, {
                    align: "center"
                });

            // Agregar imagen al PDF
            const imagePath = req.file.path;
            doc.image(imagePath, {
                fit: [250, 300],
                align: "center",
                valign: "center",
            });

            doc.end();

            // Cuando termine de escribir el archivo, enviar el PDF como respuesta
            pdfStream.on("finish", () => {
                console.log("PDF creado exitosamente.");
                res.setHeader("Content-Type", "application/pdf");
                res.setHeader("Content-Disposition", `inline; filename="${req.body.Nombre}.pdf"`);
                res.sendFile(pdfPath);
            });

            pdfStream.on("error", (err) => {
                throw err;
            });
        } else {
            throw "No se proporcionó un archivo";
        }
    } catch (err) {
        console.error(err);
        res.status(400).send("Error: " + err);
    }
});

// Escuchar en el puerto 3030
app.listen(3030, () => {
    console.log("Aplicación escuchando en el puerto 3030");
});