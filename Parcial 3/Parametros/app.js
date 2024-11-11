const express = require("express");
var app = express();

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hola Mundo!");
});

app.get("/Maestros", function (req, res) {
  console.log(req.body);
  res.send("En el body")
});

app.get("/Estudiante/:Carrera", function (req, res) {
  console.log(req.params.Carrera);
  console.log(req.query.control);
  res.send("En el query params")
});

app.get("/Administrativos", function (req, res) {
  console.log(req.query);
  res.send("En el query")
});
  
app.listen(3000, function () {
  console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});