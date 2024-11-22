const express = require("express");
const path = require("path");
const multer = require("multer");
const pdf = require("pdfkit");
const fs = require("fs");
const cors = require("cors");
const { check, validationResult} = require("express-validator");
const app = express();
const folder = path.join(__dirname, "archivos");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

const Validator = [
    check("Nombre")
        .notEmpty()
        .withMessage("El nombre no puede estar vacío")
        .isLength({ min: 3, max: 20 })
        .withMessage("El nombre debe tener entre 3 y 20 caracteres")
        .isAlphanumeric()
        .withMessage("el nombre proporcionado deve ser alfanumerico"),
    check("archivo")
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error("Se requiere un archivo proporcionado");
            }

            // Validación de extensiones
            const ext = path.extname(req.file.originalname).toLowerCase();
            const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

            if (!allowedExtensions.includes(ext)) {
                throw new Error("El tipo de archivo no es válido. Solo se permiten JPG, JPEG, PNG y GIF.");
            }
            return true;
        })
];

const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }
    next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/ArchivoPDF",upload.single("archivo"),Validator,handleErrors, (req, res) => {

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
    }
);

app.listen(3030, () => {
    console.log("Aplicación escuchando en el puerto 3030");
});