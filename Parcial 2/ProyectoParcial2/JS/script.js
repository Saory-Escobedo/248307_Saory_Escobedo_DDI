const app = document.querySelector("#app");

let usuarios = [];

class Usuario{
constructor(nombre,apellido,correo,contraseña){
this.nombre = nombre;
this.apellido = apellido;
this.correo = correo;
this.contraseña = contraseña;
}
}

//inicio sesion
function mostrarLogin(){

app.innerHTML = `
<h2>Iniciar Sesión</h2>

<form id="loginForm">
<input type="email" name="correo" placeholder="Correo" required>
<input type="password" name="contraseña" placeholder="Contraseña" required>
<button type="submit">Entrar</button>
</form>

<br><br>

<p>No tienes cuenta?</p>
<button id="irRegistro">Registrarse</button>
`;

document.querySelector("#loginForm")
.addEventListener("submit", iniciarSesion);

document.querySelector("#irRegistro")
.addEventListener("click", mostrarRegistro);

}

//registro
function mostrarRegistro(){

app.innerHTML = `
<h2>Registro</h2>

<form id="registroForm">
<input type="text" name="nombre" placeholder="Nombre" required>
<input type="text" name="apellido" placeholder="Apellido" required>
<input type="email" name="correo" placeholder="Correo" required>
<input type="password" name="contraseña" placeholder="Contraseña" required>
<input type="password" name="confirmar" placeholder="Confirmar contraseña" required>
<button type="submit">Registrar</button>
</form>

<br><br>

<button id="volver">Volver</button>
`;

document.querySelector("#registroForm")
.addEventListener("submit", registrarUsuario);

document.querySelector("#volver")
.addEventListener("click", mostrarLogin);

}

//registrar usuario
function registrarUsuario(e){

e.preventDefault();

const datos = Object.fromEntries(new FormData(e.target).entries());

if(datos.contraseña !== datos.confirmar){
console.log("Contraseñas diferentes");
return;
}

const existe = usuarios.find(u => u.correo === datos.correo);

if(existe){
console.log("Usuario ya registrado");
return;
}

const nuevoUsuario = new Usuario(
datos.nombre,
datos.apellido,
datos.correo,
datos.contraseña
);

usuarios.push(nuevoUsuario);

console.log("Usuarios:",usuarios);

mostrarLogin();

}

//iniciar sesion
function iniciarSesion(e){

e.preventDefault();

const datos = Object.fromEntries(new FormData(e.target).entries());

const usuarioEncontrado = usuarios.find(
u => u.correo === datos.correo && u.contraseña === datos.contraseña
);

if(usuarioEncontrado){

guardarSesion(usuarioEncontrado);

mostrarInicio();

}else{

console.log("Datos incorrectos");

}

}

//pagina de inicio
function mostrarInicio(){

const usuario = obtenerSesion();

app.innerHTML = `
<h1>Bienvenid@ ${usuario.nombre}</h1>

<h2>Imagenes de Gatos :D!!</h2>

<div id="contenedor"></div>
<br><br>

<h2>Datos sobre Gatos :b !!</h2>
<div id="contenedor2"></div>

<br>
<div class="BotonGrande">
    <button id="cerrar">Cerrar sesión</button>
</div>
`;

document.querySelector("#cerrar")
.addEventListener("click", cerrarSesion);

cargarGatos();
GatosDatos();
activarObservador();

}

//fetch y targetas
function cargarGatos(){

fetch("https://api.thecatapi.com/v1/images/search?limit=6")
.then(res => res.json())
.then(datos => {

const contenedor = document.querySelector("#contenedor");

datos.forEach(gato =>{

const card = document.createElement("div");

card.classList.add("card");

card.innerHTML = `
<img src="${gato.url}">
`;

contenedor.appendChild(card);

});

});

}

function GatosDatos(){

fetch("https://meowfacts.herokuapp.com/?count=5")
.then(res => res.json())
.then(datos => {

    const contenedor = document.querySelector("#contenedor2");
    contenedor.innerHTML = "";

    datos.data.forEach(dato => {

        const p = document.createElement("p");
        p.textContent = dato;

        contenedor.appendChild(p);

    });

})
.catch(error => console.error(error));

}

//observador
function activarObservador(){

const contenedor = document.querySelector("#contenedor");
const contenedor2 = document.querySelector("#contenedor2");

const observer = new MutationObserver(mutations =>{

mutations.forEach(m =>{

if(m.addedNodes.length > 0){

console.log("Se agrego un contenedor");

}

});

});

observer.observe(contenedor,{childList:true});
observer.observe(contenedor2,{childList:true});
}

//cerrar sesion
function cerrarSesion(){

cerrarSesionStorage();

mostrarLogin();

}

//verificar sesion
if(obtenerSesion()){
mostrarInicio();
}else{
mostrarLogin();
}