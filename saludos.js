'use strict';
// codigo de alumno: Carlos Boni
// porfa profe buena nota, he documentado como me pide
// fecha: 26 abril 2023

// variable que uso para pintar los saludos
var colorfuente = "white";

// defino un array con colores, tipo constante
const colores = [];
colores[0] = "green";
colores[1] = "brown";
colores[2] = "blue";
colores[3] = "beige";
colores[4] = "magenta";

// solo para vuestro conocimiento, formas alternativas de declarar
// e inicializar arrays. Preferible la del constructro new

const colores2 = ["green", "brown", "blue", "beige", "magenta"];

const colores3 = new Array("green", "brown", "blue", "beige", "magenta");

const colores4 = new Array(3);
colores4[0] = "green";
colores4[1] = "brown";
colores4[2] = "blue";
colores4.push("beige");
colores4.push("magenta");

// funcion que sirve para mostrar un mensaje en un elemento
function saludar(identificador) {
    let elem = document.getElementById(identificador);
    elem.style.color = colorfuente;
    elem.innerHTML = "Hi there";
    colorfuente = getComputedStyle(elem).backgroundColor;
}


function pintar() {
    /*     sirve para 
    elegir elementos a 
    pintar y colores */

    for (let x = 1; x <= colores.length; x++) {
        let ident = "c"+x;
        let cf = colores[x-1];
        rellenar(ident,cf);
    }
}


function rellenar(identificador, colorfondo) {
    // sirve para pintar un cuadrito

    let elem = document.getElementById(identificador);
    elem.style.backgroundColor = colorfondo;
}

pintar();
