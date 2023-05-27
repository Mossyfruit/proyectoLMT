'use strict'
function aplicarAjustes() {
    var color = document.getElementById("colorInput").value;
    var font = document.getElementById("fontSelect").value;

    localStorage.setItem("color", color);
    localStorage.setItem("font", font);

    aplicarEstilo(color, font);
}

function aplicarEstilo(color, font) {
    var body = document.body;
    var serpiente=document.getElementById("snake")
    var principal=document.getElementById("principal");

    body.style.color = color;
    body.style.fontFamily = font;
    serpiente.style.color = color;
    serpiente.style.fontFamily = color;
    principal.style.color = color;
    principal.style.fontFamily = font;
}
function mostrarTutorial(){
 alert("Usa las teclas con flechas en tu teclado para determinar la direccion"+"\nCaptura el punto para ganar un punto y tamaño.\nSi te chocas con otra parte de la serpiente, perderas.")    

}