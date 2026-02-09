// parallax (mousemove)
const parallax = document.getElementById("parallax");

parallax.addEventListener("mousemove", (e) => {
    const rect = parallax.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    parallax.style.backgroundPosition = 
        `${50 + x * 20}% ${50 + y * 20}%`;
});

// click
const clickBox = document.getElementById("clickBox");

clickBox.addEventListener("click", () => {
    clickBox.style.background = "#1abc9c";
    clickBox.textContent = "hiciste click";
});

// scroll
const scrollBox = document.getElementById("scrollBox");

scrollBox.addEventListener("scroll", () => {
    scrollBox.style.background = "#e67e22";
    scrollBox.textContent = "hiciste scroll";
});


// mouse Move
const moveBox = document.getElementById("moveBox");

moveBox.addEventListener("mousemove", (e) => {
    moveBox.textContent = `X: ${e.offsetX} Y: ${e.offsetY}`;
});

// load
window.addEventListener("load", () => {
    const loadBox = document.getElementById("loadBox");
    loadBox.style.background = "#9b59b6";
    loadBox.textContent = "pagina cargada ";
});
