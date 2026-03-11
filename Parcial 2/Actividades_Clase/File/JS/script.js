/*
function LeerArchivo(event){
    
    const archivo = event.target.files[0];   //console.log(event);     esta te da todos los atributos en general

    console.log(archivo.type)
    if (archivo){
        if(archivo.type === "image/jpeg" || archivo.type == "image/png" || archivo.type == "image/webp"){
            const lectorArchivo = new FileReader(); //objeto que lee los archivos

            lectorArchivo.onload = (elemento) =>   //checa que ya se cargo lector
            {
                const contenido = elemento.target.result;
                const imagen = document.querySelector("#imagenSeleccionada");  //imprime el resultado
                imagen.src = contenido;
            }
            lectorArchivo.readAsDataURL(archivo); //siempres se usa readAsText
        }
        else{
            console.log("el tipo de archivo es invalido");
        }
    }
    else{
        console.log("no se leyo el archivo");
    }
}
*/

//hacemos lo mismo pero de manera asincrona, con una promesa
document.querySelector("#input-imagen").addEventListener('change',(event) => {
    const url = LeerArchivo(event.target.files[0]);
    url.then((dato) => {
        const imagen = document.querySelector("#imagenSeleccionada");
        imagen.src = dato;
    }).catch(
        () => {
            console.log("esta mal, en que, en algo");     
        }
    )
})

function LeerArchivo(archivo){
    return new Promise((resolve, reject) => {
        if(archivo){ //verifica que hay un archivo
            if(archivo.type === "image/jpeg" || archivo.type == "image/png" || archivo.type == "image/webp"){
                const lectorArchivo = new FileReader(); 

                lectorArchivo.onload = (elemento) => {
                    const contenido = elemento.target.result;
                    resolve(contenido);
                }
                lectorArchivo.readAsDataURL(archivo);
            }
            else{
                reject();
            }
        }
        else{
            reject();
        }
    });
}

