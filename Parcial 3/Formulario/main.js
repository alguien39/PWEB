require('dotenv').config();

const express = require("express");
const path = require("path");
const multer = require("multer");
const pdf = require("pdfkit");
const fs = require("fs");
const cors = require("cors");
const mysql2 = require("mysql2");
const { check, validationResult } = require("express-validator");

const app = express();
const folder = path.join(__dirname, "archivos");

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Validación
const Validator = [
    check("Nombre")
        .notEmpty()
        .withMessage("El nombre no puede estar vacío")
        .isLength({ min: 3, max: 20 })
        .withMessage("El nombre debe tener entre 3 y 20 caracteres")
        .isAlphanumeric()
        .withMessage("El nombre proporcionado debe ser alfanumérico")
];

// Manejo de errores
const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    next();
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configuración de la base de datos MySQL
const db = mysql2.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '22100166',
  database: process.env.DB_NAME || 'PeliculasDB'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Ruta para generar archivo PDF
app.post("/ArchivoPDF", upload.single("archivo"), Validator, handleErrors, (req, res) => {
    if (!req.file) {
        return res.status(400).send("No se proporcionó un archivo o el formato no es válido");
    }

    try {
        console.log(`Archivo recibido: ${req.file.originalname}`);
        console.log(`Hola ${req.body.Nombre}`);

        const doc = new pdf();
        const pdfPath = path.join(folder, `${req.body.Nombre}.pdf`);
        const pdfStream = fs.createWriteStream(pdfPath);

        doc.pipe(pdfStream);
        doc.fontSize(45).fillColor("blue").text(`Pdf creado. Su nombre es: ${req.body.Nombre}`, { align: "center" });

        const imagePath = req.file.path;
        doc.image(imagePath, {
            fit: [250, 300],
            align: "center",
            align: "center",
        });

        doc.end();

        pdfStream.on("finish", () => {
            console.log("PDF creado exitosamente.");
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `inline; filename="${req.body.Nombre}.pdf"`);
            res.sendFile(pdfPath);
        });

        pdfStream.on("error", (err) => {
            throw err;
        });
    } catch (err) {
        console.error(err);
        res.status(400).send("Error: " + err.message);
    }
});

// Ruta para verificar el funcionamiento del servidor
app.get("/Get", (req, res) => {
    res.send("Endpoint funcionando correctamente");
});

// CRUD básico de MySQL

// Crear un nueva critica
app.post('/AgregarCritica', (req, res) => {
  const {Puntuacion, Comentario, Autor } = req.body;

      // Insertar la crítica en la base de datos
  const insertarCriticaQuery = `
        INSERT INTO Criticas (PeliculaID, Autor, Puntuacion, Comentario, Fecha)
        VALUES (2, ?, ?, ?, ?)
    `;
  const Fecha = new Date(); // Fecha actual
  db.query(insertarCriticaQuery,[PeliculaID, Autor, Puntuacion, Comentario, Fecha],(err, result) => 
        {
            if (err) {
                console.error('Error al insertar crítica:', err);
                return res.status(500).send('Error al insertar la crítica');
            }

            res.send('Crítica agregada correctamente');
        }
    );
});

// Obtener todos los usuarios
app.get('/Peliculas', (req, res) => {
    const query = 'SELECT * FROM Peliculas';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener datos:', err);
            res.status(500).send('Error al obtener datos');
        } else {
            res.json(results);
        }
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
