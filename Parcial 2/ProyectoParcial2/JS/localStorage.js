function guardarSesion(usuario){
    localStorage.setItem("usuarioLogeado", JSON.stringify(usuario));
}

function obtenerSesion(){
    return JSON.parse(localStorage.getItem("usuarioLogeado"));
}

function cerrarSesionStorage(){
    localStorage.removeItem("usuarioLogeado");
}

console.log("storage si se cargo :D");