
/**
 * Fichero javaScript que genera las casillas para el juego de Snake
 */
const generaMundo = () => {
    /**
     * Iniciamos un bucle que crea casillas hasta el tamaño determinado en config por tamanoMundo
     */
    for (let filaIndice = 0; filaIndice < tamanoMundo; filaIndice++) {
        const fila = document.createElement('div');
    
        fila.classList.add('fila');
        /**
         * Ahora creamos un segundo bucle interno que reconozca el input del usuario, activando la casilla para el movimiento de la serpiente en Snake
         */
        for (let filaIndice = 0; filaIndice < tamanoMundo; filaIndice++) {
            const input = document.createElement('input');
    
            input.type = 'checkbox';
    
            fila.appendChild(input);
        }
        /**
         * seleccionamos lo creado para que el selector de las clases lo elija.
         */
        document.querySelector('.mundo').appendChild(fila);
    }
}
/**
 * y hacemos un builder para llamarlo en otras funciones.
 */
console.log("Mundo creado correctamente")
generaMundo();