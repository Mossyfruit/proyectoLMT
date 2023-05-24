
/**
 * Fichero Js que conserva las constantes para el juego Snake.
 * velocidad: velocidad de movimiento
 * tamanoMundo: numero de casillas de juego
 * puntoInicio: posicion de inicio del objeto Snake
 * snake: donde se genera el objeto Snake
 * tecla: Registro de movimiento y velocidad de las teclas.
 * direccion: proviene del Fichero juego, se registra aqui
 * movimientoIntervalo: proviene del Fichero juego, se registra aqui.
 */
const velocidad = 6;
const tamanoMundo = 10;
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