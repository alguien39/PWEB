const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.post("/Formulario", (req, res) => {
  console.log(req.body);
  res.send(`Hola ${req.body.Nombre}`);
});

app.listen(3000,() => {
    console.log("Aplicación ejemplo, escuchando el puerto 3000!");
});