
/**
 * En este Fichero Js se encuentran la mayoria de las funciones del juego de Snake. 
 */
/**
 * definimos las filas que creamos en config
 */
const filas = document.querySelectorAll('.fila');
/**
 * Localizamos en que espacio estan los objetos con la siguiente funcion. Nos aseguramos de que no pueda ser fuera de las casillas creadas restandole 1 a cada valor
 * @param {*} x  parametro de posicion dentro de filas -1
 * @param {*} y  parametro de posicion dentro de columnas -1
 * @returns  el objeto que se halle en la posicion x,y
 */
const getObjetoEn = (x, y) => filas[y - 1].children[x - 1];
/**
 * Confirma la existencia del objeto devolviendo un booleano en las posiciones x,y del tablero de juego "mundo"
 * @param {*} x posicion horizontal (fila) del objeto a hallar
 * @param {*} y  posicion vertical (columna) del objeto a hallar
 * @returns true si el objeto esta en esa posicion, false si no.
 */
const revisaObjeto = (x, y) => getObjetoEn(x, y).checked = true;
/**
 * Funcion identica a la anterior, pero deja el booleano como false de no hallarse objeto alguno
 * @param {*} x posicion fila del objeto a hallar
 * @param {*} y posicion columna del objeto a hallar
 * @returns 
 */
const deseleccionaObjeto = (x, y) => getObjetoEn(x, y).checked = false;

/**
 * coloca el punto a capturar por la serpiente en la posicion x,y
 * @param {*} x posicion fila del objeto a hallar
 * @param {*} y posicion columna del objeto a hallar
 */
const colocarPuntoEn = (x, y) => {
    getObjetoEn(x, y).type = 'radio';
    revisaObjeto(x, y);
}
/**
 * Quita el punto una vez capturado por el jugador
 * @param {*} x posicion fila del objeto a hallar
 * @param {*} y posicion columna del objeto a hallar
 */
const quitarPuntoEn = (x, y) => {
    getObjetoEn(x, y).type = 'checkbox';
    deseleccionaObjeto(x, y);
}
/**
 * Encuentra el punto a capturar a lo largo del tablero de juego
 * @returns posicion (fila,columna) del Punto
 */
const encontrarPunto = () => {
    const posicion = [1, 1];
/**
 * Recorre el tablero en cada posicion del Array hasta que encuentre la posicion (fila,columna) del mismo
 */
    filas.forEach((fila, filaIndice) => {
        Array.from(fila.children).forEach((input, inputIndice) => {
            if (input.type === 'radio') {
                posicion[0] = inputIndice + 1;
                posicion[1] = filaIndice + 1;
            }
        });
    });

    return posicion;
}
/**
 * Selecciona una posicion aleatoria de inicio para el Punto
 * @returns posicion en el tablero aleatoria que este vacia.
 */
const posicionAleatoria = () => {
    /**
     * Cargamos el tablero
     */
    const posicionesDisponibles = [];
    /**
     * nos aseguramos de que no se esta desplazando el jugador a la casilla donde posiblemente se genere el punto
     */
    filas.forEach((fila, filaIndice) => {
        /**
         * Recorriendo el Array para confirmar dicha posicion de movimiento del jugador
         */
        Array.from(fila.children).forEach((input, inputIndice) => {
            if (input.type === 'checkbox' && input.checked === false) {
                /**
                 * Y si el input del jugador esta dirigido alli, la ponemos en otra posicion
                 */
                posicionesDisponibles.push([inputIndice + 1, filaIndice + 1]);
            }
        });
    });
    /**
     * Cargamos la funcion random que usara el reloj local del equipo para generar un numero cuasi aleatorio que sirva de indice (posicion en el array)
     */
    const indice = Math.floor(Math.random() * (posicionesDisponibles.length) - 1) + 1;

    return posicionesDisponibles[indice];
}
/**
 * Funcion para aumentar la puntuacion del jugador
 */
const cambiaPuntos = () => {
    /**
     * seleccionamos la clase score de snake.html que cambiaremos
     */
    const score = document.querySelector('.score');
    /**
     * Limitamos el maximo numero de puntos y creamos la variable score que saldra como puntuacion en nuestro juego. Finalmente, le sumamos 1.
     */
    scoreActual = parseInt(score.innerText, 10);
    score.innerText = scoreActual + 1;
}
/**
 * Vamos a programar que nuestro programa JS reconozca el input del jugador. Usaremos las flechas
 */
const teclasInput = () => {
    /**
     * creamos un listener de presion de las teclas
     */
    document.addEventListener('keydown', (e) => {
        /**
         * con el siguiente switch, creamos reglas logicas con operadores ternarios que determinan nuestra direccion de movimiento. 
         * la sintaxis es condicion ? valor1 : valor2, donde, de cumplirse la condicion, se tomara el valor1, y si no, val2.
         * Hacemos break para que se cuente cada vez la direccion. 
         */
        
        switch(e.key) {
            
            case "ArrowUp":    direccion = direccion === 'down' ? 'down' : 'up'; break;
            case "ArrowDown":  direccion = direccion === 'up' ? 'up' : 'down'; break;
            case "ArrowLeft":  direccion = direccion === 'right' ? 'right' : 'left'; break;
            case "ArrowRight": direccion = direccion === 'left' ? 'left' : 'right'; break;
        }
        /**
         * Si la dirección no esta definida dentro de un intervalo, la funcion moverr nos desplazara en la direccion seleccionada anteriormente, o, en su defecto, 
         * a la left, y determinara una velocidad (intervalo de movimiento, o, como esta llamado aqui, movimientoIntervalo) 1000/velocidad, donde velocidad
         * esta configurada en el config.js
         */
        e.preventDefault();
        if (movimientoIntervalo === undefined) {
            movimientoIntervalo = setInterval(() => {
                mover(direccion || 'left');
            }, 1000 / velocidad);
        }
        
    });
}
/**
 * La siguiente funcion inicia una "oleada" o wave, que es una animación para el juego
 * Para ello tenemos que confirmar en que casilla esta la serpiente , despues obtener el objeto
 * de la serpiente que esta controlando el jugador (cabeza) , y finalmente delimita las casillas
 * en las cuales no tiene que realizarse la animacion.
 * @param {*} cabeza 
 */
const iniciarWave = cabeza => {
    const confirmadas = [];

    for (let x = 1; x <= tamanoMundo; x++) {
        for (let y = 1; y <= tamanoMundo; y++) {
            confirmadas.push(getObjetoEn(x, y));
        }
    }

    getObjetoEn(...cabeza).className = 'wave';

    confirmadas.forEach((checkbox, indice) => {
        setTimeout(() => {
            checkbox.className = 'wave';
            checkbox.checked = false;
        }, 10 * indice);
    });
}
/**
 * Funcion final de la direccion de la serpiente Snake y su movimiento.
 * @param {*} direccionS 
 */
const mover = direccionS => {
    /**
     * Primero localizamos la posicion del punto, y inicializamos la cabeza y la cola de la serpiente
     */
    const posicionPunto = encontrarPunto();
    const cabeza = [...snake[0]];
    const cola = [...snake[snake.length - 1]];
    /**
     * A contimnuacion introducimos este metodo que primero usa la funcion unshift para añadir
     * a nuestra serpiente mas partes y actualizarla, quitando el ultimo elemento con la funcion pop.
     * De esta manera, en el tablero parece que la serpiente esta avanzando y su cola le sigue.
     */
    const actualizaSnake = () => {
        snake.unshift(cabeza);
        snake.pop();

        snake.forEach(snakePart => revisaObjeto(...snakePart));
    }
    /**
     * Con esta funcion switch alteramos la direccion a la que se dirije la cabeza segun la direccion
     * de la misma, y si se dirige a otra casilla. Usamos de nuevo un operador ternario para determinar
     * si la direccion va en una de las cuatro direcciones
     */
    switch (direccionS) {
        case 'up':    cabeza[1] = cabeza[1] === 1 ? tamanoMundo : cabeza[1] - 1; break;
        case 'down':  cabeza[1] = cabeza[1] === tamanoMundo ? 1 : cabeza[1] + 1; break;
        case 'left':  cabeza[0] = cabeza[0] === 1 ? tamanoMundo : cabeza[0] - 1; break;
        case 'right': cabeza[0] = cabeza[0] === tamanoMundo ? 1 : cabeza[0] + 1; break;
    }
    /**
     * Nuestra condicion de parada del juego, "Game Over", siendo esta una condicion booleana que ocurre
     * si la cabeza de la serpiente entra en contacto con una casilla checked (donde termina el tablero o ya hay una casilla ocupada por la serpiente)
     * finalmente finaliza el registro de inputs, da un mensaje y para el intervalo.
     */
    if (getObjetoEn(...cabeza).type === 'checkbox' && getObjetoEn(...cabeza).checked) {
        document.querySelector('h1').innerText = 'Game Over...';
        document.querySelectorAll('input').forEach(input => input.disabled = true);

        iniciarWave(cabeza);

        clearInterval(movimientoIntervalo);
    }
    /**
     * Y finalmente el proceso de alcanzar el punto y hace la serpiente más larga.
     * Si la cabeza esta en posicion punto o se dirige a ella en el siguiente intervalo de movimiento,
     * la cola crece con la funcion push, pone un nuevo punto en una posicion aleatoria, quita el punto alcanzado,
     * y actualiza a nuestra serpiente para continuar el juego. Si eso no ocurre, la serpiente se sigue moviendo
     * (actualizasnake) y deseleccionamos la cola alli donde este desplazandose adelante (ya no es checked)
     */
    if (cabeza[0] === posicionPunto[0] && cabeza[1] === posicionPunto[1]) {
        snake.push(cola);

        colocarPuntoEn(...posicionAleatoria());
        quitarPuntoEn(...posicionPunto);
        
        cambiaPuntos();

        actualizaSnake();
    } else {
        actualizaSnake();
        deseleccionaObjeto(...cola);
    }
}
