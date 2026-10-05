# API de Películas

Proyecto realizado con Node.js, Express, JSON, HTML, CSS y JavaScript.

## 1. Instalar dependencias

Abre una terminal dentro de esta carpeta y ejecuta:

```bash
npm install
```

## 2. Ejecutar el proyecto

```bash
npm start
```

El servidor se abrirá en:

http://localhost:3000

La API se encuentra en:

http://localhost:3000/api/peliculas

## 3. Endpoints

### Obtener todas las películas
GET /api/peliculas

### Obtener una película
GET /api/peliculas/1

### Agregar una película
POST /api/peliculas

Ejemplo de JSON:

{
  "titulo": "Mi película",
  "anio": 2026,
  "genero": "Drama",
  "director": "Director",
  "imagen": "https://ejemplo.com/imagen.jpg"
}

### Actualizar una película
PUT /api/peliculas/1

### Eliminar una película
DELETE /api/peliculas/1

## 4. Estructura

API_Peliculas/
├── public/
│   ├── index.html
│   ├── index.js
│   └── style.css
├── peliculas.json
├── app.js
├── package.json
└── README.md
