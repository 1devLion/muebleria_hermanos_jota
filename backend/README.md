# Backend - Mueblería Hermanos Jota

API REST en Node.js + Express que entrega el catálogo de productos.

## Ejecución

```bash
npm install
npm start
```

Por defecto escucha en `http://localhost:3001`.

## Variables de entorno

- `PORT`: puerto de la API (por defecto `3001`).
- `CLIENT_ORIGIN`: origen del cliente permitido por CORS (por defecto `http://localhost:5173`).

## Endpoints

- `GET /` - mensaje de bienvenida.
- `GET /api/productos` - listado completo de productos.
- `GET /api/productos/:id` - un producto; responde 404 con `{ "mensaje": "..." }` si no existe.

Cualquier otra ruta responde 404 en JSON. Los errores no controlados los resuelve `middlewares/errorHandler.js`, y `middlewares/logger.js` registra cada petición en consola.
