'use strict'
/**
 * Un constructor para iniciar el juego. Llama a las funciones usadas en otros ficheros Js de este proyecto, y una vez hecho, ejecuta el juego
 */
const start = () => {
    pillaInput();
    /**
     * Para poder usar estas funciones correctamente necesitamos separar sus arrays en variables separadas, por lo que usamos el spread operator (...Array())
     */
    revisaObjeto(...startPoint);
    colocarPuntoEn(...posicionAleatoria());
}

start();