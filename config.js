const velocidad = 6;
const tamañoMundo = 10;
const puntoInicio = [5, 5];
const snake = [puntoInicio];
const tecla = {
    teclaArriba: 38,
    teclaAbajo: 40,
    teclaIzquierda: 37,
    teclaDerecha: 39
};

let direccion;
let movimientoIntervalo;