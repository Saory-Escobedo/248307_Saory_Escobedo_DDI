const url = "https://pokeapi.co/api/v2/pokemon?limit=10";


fetch(url)
 
fetch(url).then(
     respuesta => {
       if(respuesta.ok)
        return respuesta.json();
     }
).then(
     datos =>{
        for(let i=0; i<datos.results.length; i++){
             console.log(datos.results[i].url);
         }
 }   
).catch(error =>{
     console.error(error.message);
})
function Peticion2(url){
    fetch(url).then(respuesta => {
        if (!respuesta.ok)
            return respuesta.json()
    }).then(datos =>{

            for(let i=0; i<datos.results.length; i++)
                {
                    console.log(datos.results[i].url);
                    fetch(datos.results[i].url).then(
                     respuesta => {
                        if (respuesta.ok)
                            return respuesta.json()
                         }).then(
                            datos =>{
                                console.log(datos);
                         }
                        ).catch(error =>{
                             console.log (error.message);
                        })
                }
        }) //final
}

fetch(url)
  .then(res => res.json())
  .then(datos => {

    datos.results.forEach(pokemon => {

      fetch(pokemon.url)
        .then(res => res.json())
        .then(detalle => {

          const card = document.createElement("div");

          const nombre = document.createElement("h3");
          nombre.textContent = detalle.name;

          const imagen = document.createElement("img");
          imagen.src = detalle.sprites.front_default;

          card.appendChild(nombre);
          card.appendChild(imagen);

          document.getElementById("contenedor").appendChild(card);
        });
    });
  })
  .catch(error => console.error(error));