
const titulo = document.querySelector("#mantelTexto");
const conejo = document.querySelector("#chilaquil");
const letras = document.querySelector("#cuchilloTenedor");

window.addEventListener("scroll", (event)=>{
    mantelTexto.style.top= window.scrollY * 3 + "px";
    chilaquil.style.bottom= window.scrollY * .5 + "px";
    cuchilloTenedor.style.top= window.scrollY * .5 + "px";
})