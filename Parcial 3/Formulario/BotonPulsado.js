document.getElementById("btnEnviar").addEventListener("click", async function (event) {
    event.preventDefault();

    const formulario = document.getElementById("Forma");
    const datosForm = new FormData(formulario); // Crear FormData basado en el formulario

    fetch('http://localhost:3000/Formulario', {
        method: 'POST',
        body: datosForm
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
});