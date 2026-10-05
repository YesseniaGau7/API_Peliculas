const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const rutaPeliculas = path.join(__dirname, "peliculas.json");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function leerPeliculas() {
    const contenido = fs.readFileSync(rutaPeliculas, "utf8");
    return JSON.parse(contenido);
}

function guardarPeliculas(peliculas) {
    fs.writeFileSync(
        rutaPeliculas,
        JSON.stringify(peliculas, null, 2),
        "utf8"
    );
}

app.get("/api/peliculas", (req, res) => {
    const peliculas = leerPeliculas();
    res.json(peliculas);
});

app.get("/api/peliculas/:id", (req, res) => {
    const peliculas = leerPeliculas();
    const id = Number(req.params.id);
    const pelicula = peliculas.find((p) => p.id === id);

    if (!pelicula) {
        return res.status(404).json({
            mensaje: "Película no encontrada"
        });
    }

    res.json(pelicula);
});

app.post("/api/peliculas", (req, res) => {
    const peliculas = leerPeliculas();

    const { titulo, anio, genero, director, imagen } = req.body;

    if (!titulo || !anio || !genero || !director || !imagen) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    const nuevoId =
        peliculas.length > 0
            ? Math.max(...peliculas.map((p) => p.id)) + 1
            : 1;

    const nuevaPelicula = {
        id: nuevoId,
        titulo,
        anio: Number(anio),
        genero,
        director,
        imagen
    };

    peliculas.push(nuevaPelicula);
    guardarPeliculas(peliculas);

    res.status(201).json(nuevaPelicula);
});

app.put("/api/peliculas/:id", (req, res) => {
    const peliculas = leerPeliculas();
    const id = Number(req.params.id);
    const indice = peliculas.findIndex((p) => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Película no encontrada"
        });
    }

    const { titulo, anio, genero, director, imagen } = req.body;

    if (!titulo || !anio || !genero || !director || !imagen) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios"
        });
    }

    peliculas[indice] = {
        id,
        titulo,
        anio: Number(anio),
        genero,
        director,
        imagen
    };

    guardarPeliculas(peliculas);

    res.json(peliculas[indice]);
});

app.delete("/api/peliculas/:id", (req, res) => {
    const peliculas = leerPeliculas();
    const id = Number(req.params.id);
    const indice = peliculas.findIndex((p) => p.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Película no encontrada"
        });
    }

    const peliculaEliminada = peliculas.splice(indice, 1)[0];
    guardarPeliculas(peliculas);

    res.json({
        mensaje: "Película eliminada correctamente",
        pelicula: peliculaEliminada
    });
});

app.get("/api", (req, res) => {
    res.json({
        mensaje: "API de películas funcionando correctamente",
        endpoints: [
            "GET /api/peliculas",
            "GET /api/peliculas/:id",
            "POST /api/peliculas",
            "PUT /api/peliculas/:id",
            "DELETE /api/peliculas/:id"
        ]
    });
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api/peliculas`);
});
