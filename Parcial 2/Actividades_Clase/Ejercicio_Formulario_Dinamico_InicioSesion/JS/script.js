const formulario = document.querySelector("#form_2")
const sesion = document.querySelector("#form_InicioSesion")

class Usuario{
    constructor(correo, constraseña){
        this.correo = correo;
        this.constraseña = constraseña;
    }
}

function leerDatos(){
    const datosFormulario = new FormData(formulario);
    const datos = Object.fromEntries(datosFormulario.entries());

    let usuarioNuevo = new Usuario(datos.correo, datos.constraseña);
    console.log(usuarioNuevo);
}

let GuardarDatos = (usuarioNuevo)=>{
    datos.correo;
    datos.constraseña;
} 

function InicioSesion(){
    const datosFormulario = new FormData(sesion);
    const datos2 = Object.fromEntries(datosFormulario.entries());
 
    let verifica = new Usuario(datos2.correo, datos2.constraseña);
    console.log(verifica);

    if(GuardarDatos == VerfDatos){
        console.log("Contraseña o correo incorrecto, intentalo de nuevo");
    }
    else{
        console.log("Inicio de sesion exitoso"); 
    } 
}

let VerfDatos = (InicioSesion)=>{
    datos2.correo;
    datos2.constraseña;
} 
