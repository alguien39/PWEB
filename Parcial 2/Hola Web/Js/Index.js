//Utilizado para aumentar las restricciones dentro del codigo evitando posibles errores
'Use strict'
console.log("Hola Mundo");
//let vive en bloque
let Variable;
//var vive en funcion y se hace huisting (se declara al principio de la funcion incluso si esta se encuentra dentrom de una condicion) no se 
//le inicializa el valor
var Variable2;
//La constante se mantiene y su valor no puede ser modificado, vive dentro del bloque
const Constante1=100;
//declaracion de la variable 
x = 12;

function Procedimiento(){
    //var NoDeberiaExistir (declarado al principio del codigo a causa del hoisting)
    Variable = "Hola";
    Variable2 = "Mundo";
    console.log(Variable + " " + Variable2);
    if(false){
        var NoDeBeriaExistir = "No existo";
        console.log(NoDeBeriaExistir);
    }
}

Procedimiento();