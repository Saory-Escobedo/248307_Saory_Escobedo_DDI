const galeria = document.querySelector(".galeria");
const botones = document.querySelectorAll("button");

// imagenes con su categoria
const imagenes = [
    { url: "../Recursos/imagenes/cancion1.jpg", categoria: "dibujando" },
    { url: "../Recursos/imagenes/cancion2.jpg", categoria: "feliz" },
    { url: "../Recursos/imagenes/cancion3.jpg", categoria: "triste" },
    { url: "../Recursos/imagenes/cancion4.jpg", categoria: "triste" },
    { url: "../Recursos/imagenes/cancion5.jpg", categoria: "triste" },
    { url: "../Recursos/imagenes/cancion6.jpg", categoria: "dibujando" },
    { url: "../Recursos/imagenes/cancion7.jpg", categoria: "feliz" },
    { url: "../Recursos/imagenes/cancion8.jpg", categoria: "feliz" },
    { url: "../Recursos/imagenes/cancion9.jpg", categoria: "triste" }
];

// generar tarjetas/casillas
for(let i = 0; i < imagenes.length; i++){

    const card = document.createElement("div");
    card.classList.add("card");

    card.style.backgroundImage = `url(${imagenes[i].url})`;
    card.dataset.categoria = imagenes[i].categoria;

    galeria.appendChild(card);
}

//aplicamos el evanto a todos lo botoneS
botones.forEach(boton => {

    boton.addEventListener("click", () => {

        const filtro = boton.dataset.filtro;
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            if(filtro === "todas"){
                card.style.display = "block";
            }
            else if(card.dataset.categoria === filtro){
                card.style.display = "block";
            }
            else{
                card.style.display = "none";
            }

        });

    });

});
