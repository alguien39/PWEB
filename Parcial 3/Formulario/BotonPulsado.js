document.getElementById("btnEnviar").addEventListener("click", async function (event) {
    const formulario = document.getElementById("Forma");
    const datosForm = new FormData(formulario);

    fetch('http://localhost:3030/Formulario', {
        method: 'POST',
        body: datosForm
    })
    .then(response => response.json())
        .then(dato => console.log(dato))
            .catch(error => console.error('Error:', error));
});