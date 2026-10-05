const contenedor = document.querySelector("#contenedor-peliculas");
const mensaje = document.querySelector("#mensaje");

function obtenerPeliculas() {
    fetch("/api/peliculas")
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudieron obtener las películas");
            }

            return response.json();
        })
        .then(data => {
            console.log("Datos recibidos de la API:", data);
            mostrarPeliculas(data);
        })
        .catch(error => {
            console.error(error);
            mensaje.textContent = "Ocurrió un error al cargar las películas.";
        });
}

function mostrarPeliculas(peliculas) {
    contenedor.innerHTML = "";

    peliculas.forEach(pelicula => {
        const article = document.createElement("article");

        article.innerHTML = `
            <img src="${pelicula.imagen}" alt="${pelicula.titulo}">

            <div class="info">
                <h2>${pelicula.titulo}</h2>
                <p><strong>Año:</strong> ${pelicula.anio}</p>
                <p><strong>Género:</strong> ${pelicula.genero}</p>
                <p><strong>Director:</strong> ${pelicula.director}</p>
            </div>
        `;

        contenedor.appendChild(article);
    });
}

obtenerPeliculas();
