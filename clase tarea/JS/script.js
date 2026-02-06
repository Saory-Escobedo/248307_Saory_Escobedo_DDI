
const titulo = document.querySelector("#titulo");
const conejo = document.querySelector("#conejo");
const letras = document.querySelector("#letras");

window.addEventListener("scroll", (event)=>{
    titulo.style.right= window.scrollY * 3 + "px";
    conejo.style.bottom= window.scrollY * .5 + "px";
    letras.style.top= window.scrollY * .5 + "px";
})