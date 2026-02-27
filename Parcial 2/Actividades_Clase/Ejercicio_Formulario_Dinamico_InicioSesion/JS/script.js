const app = document.querySelector("#app");

let usuarios = []; // Arreglo donde se guardan los usuarios

class Usuario {
    constructor(nombre, apellido, correo, contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}

// FORMULARIO INICIO SESION

function mostrarLogin() {
    app.innerHTML = `
        <h2>Iniciar Sesión</h2>
        <form id="loginForm">
            <input type="email" name="correo" placeholder="Correo" required><br>
            <input type="password" name="contraseña" placeholder="Contraseña" required><br>
            <button type="submit">Iniciar Sesión</button>
        </form>
        <p>No tienes cuenta? 
            <button id="irRegistro">Regístrate</button>
        </p>
    `;

    const loginForm = document.querySelector("#loginForm");
    const irRegistro = document.querySelector("#irRegistro");

    loginForm.addEventListener("submit", iniciarSesion);
    irRegistro.addEventListener("click", mostrarRegistro);
}

// FORMULARIO REGISTRO

function mostrarRegistro() {
    app.innerHTML = `
        <h2>Registrarse</h2>
        <form id="registroForm">
            <input type="text" name="nombre" placeholder="Nombre" required><br>
            <input type="text" name="apellido" placeholder="Apellido" required><br>
            <input type="email" name="correo" placeholder="Correo" required><br>
            <input type="password" name="contraseña" placeholder="Contraseña" required><br>
            <input type="password" name="confirmar" placeholder="Confirmar Contraseña" required><br>
            <button type="submit">Registrarse</button>
        </form>
        <p>
            <button id="volverLogin">Volver a Iniciar Sesión</button>
        </p>
    `;

    const registroForm = document.querySelector("#registroForm");
    const volverLogin = document.querySelector("#volverLogin");

    registroForm.addEventListener("submit", registrarUsuario);
    volverLogin.addEventListener("click", mostrarLogin);
}

// REGISTRAR USUARIO

function registrarUsuario(e) {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(e.target).entries());

    if (datos.contraseña !== datos.confirmar) {
        console.log("Las contraseñas no coinciden");
        return;
    }

    // Verificar si el correo ya existe
    const existe = usuarios.find(u => u.correo === datos.correo);

    if (existe) {
        console.log("El correo ya está registrado");
        return;
    }

    const nuevoUsuario = new Usuario(
        datos.nombre,
        datos.apellido,
        datos.correo,
        datos.contraseña
    );

    usuarios.push(nuevoUsuario);

    console.log("Usuario registrado correctamente");
    console.log(usuarios);

    mostrarLogin();
}

// INICIAR SESION

function iniciarSesion(e) {
    e.preventDefault();

    const datos = Object.fromEntries(new FormData(e.target).entries());

    const usuarioEncontrado = usuarios.find(
        u => u.correo === datos.correo && u.contraseña === datos.contraseña
    );

    if (usuarioEncontrado) {
        console.log("Inicio de sesión exitoso");
        console.log("Bienvenido:", usuarioEncontrado.nombre);
    } else {
        console.log("Correo o contraseña incorrectos");
    }
}

// Mostrar login al cargar
mostrarLogin();