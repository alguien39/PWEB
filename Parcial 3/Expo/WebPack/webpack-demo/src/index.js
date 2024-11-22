import { Saludo } from "./Saludo.js";
import { Despedida } from "./Despedida.js";

const Componente = (Nombre, Valor) => {
    if(Valor){
        Saludo(Nombre);
    }
    else{
        Despedida(Nombre);
    }
}

Componente('Clasecita', true);