const nombre = document.querySelector("#input_txt_nombre");
const apellido = document.querySelector("#input_txt_apellido"); 
const botonGuardar = document.querySelector("#btnGuardar"); 

    botonGuardar.addEventListener("click",(e)=>{
        e.preventDefault(); //para que la pantalla se quede tieasa y no carge rapido
        console.log(e.target.value);
        const usuario = new Usuario(nombre.value, apellido.value);
        console.log(usuario);

        const nombre_info = document.createElement("h2"); //metodo que se encarga de crear elementos, objeto document

        nombre_info.textContent = usuario.nombre;
        document.body.appendChild(nombre_info);
        
    })

    class Usuario{
        constructor(nom,ape){
            this.nombre = nom;
            this.apellido = ape; 
        }
    }
    
    
    
    


