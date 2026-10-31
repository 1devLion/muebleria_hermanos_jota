# Backend - Mueblería Hermanos Jota

API REST en Node.js + Express conectada a MongoDB (Atlas) con Mongoose. Ofrece el CRUD completo de productos.

## Variables de entorno

Se definen en `backend/.env` (ese archivo **no se sube al repo**; la plantilla es `.env.example`).

| Variable | Obligatoria | Descripción |
|---|---|---|
| `MONGODB_URI` | Sí | Cadena de conexión de Atlas, con el nombre de la base antes del `?` (por ejemplo `.../muebleria-jota?retryWrites=true&w=majority`). |
| `PORT` | No | Puerto de la API. Por defecto `3001`. |
| `CLIENT_ORIGIN` | No | Origen del frontend permitido por CORS. Por defecto `http://localhost:5173`. En producción, la URL del frontend desplegado. |

## Modelo Product

| Campo | Tipo | Notas |
|---|---|---|
| `nombre` | String | Obligatorio. |
| `descripcion` | String | |
| `precio` | Number | Obligatorio, no puede ser negativo. |
| `stock` | Number | Por defecto `0`, no puede ser negativo. |
| `imagenUrl` | String | Ruta relativa (`img/products/...`) o URL absoluta. |
| `medidas`, `materiales`, `acabado` | String | Opcionales, conservados del catálogo original. |

Cada producto tiene además el `_id` que genera MongoDB.

## Endpoints

| Método | Ruta | Descripción | Respuestas |
|---|---|---|---|
| GET | `/` | Mensaje de bienvenida. | 200 |
| GET | `/api/productos` | Devuelve todos los productos. | 200 |
| GET | `/api/productos/:id` | Devuelve un producto por `_id`. | 200, 400 (id inválido), 404 |
| POST | `/api/productos` | Crea un producto. | 201, 400 (datos inválidos) |
| PUT | `/api/productos/:id` | Actualiza un producto existente. | 200, 400, 404 |
| DELETE | `/api/productos/:id` | Elimina un producto. | 200, 404 |

### Ejemplos

**GET `/api/productos`** → `200`

```json
[
  {
    "_id": "6720f3a9c1d2e4b5a6f70812",
    "nombre": "Mesa de Noche Aconcagua",
    "descripcion": "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®...",
    "precio": 145000,
    "stock": 10,
    "imagenUrl": "img/products/mesa_noche_aconcagua.webp",
    "medidas": "45 × 35 × 60 cm",
    "materiales": "Roble macizo FSC®, herrajes soft-close. Barniz mate de poliuretano.",
    "acabado": "aceite-lino"
  }
]
```

**POST `/api/productos`** → `201`

```json
{
  "nombre": "Silla Nogal",
  "descripcion": "Silla de nogal con asiento tapizado.",
  "precio": 120000,
  "stock": 5,
  "imagenUrl": "img/products/silla_nogal.webp"
}
```

Va a responder con el producto creado, mostrando su `_id`. Si falta `nombre` o `precio`, tira un `400`.

**PUT `/api/productos/:id`** → `200`

```json
{ "precio": 130000, "stock": 8 }
```

Responde con el producto ya actualizado. Si no existe suelta un `404`.

**DELETE `/api/productos/:id`** → `200`

```json
{ "mensaje": "Producto eliminado" }
```

Si no existe también `404`.

## Errores

Los errores responden en JSON con la forma `{ "mensaje": "..." }`:

```json
{ "mensaje": "Producto no encontrado" }
```

Si la ruta no existe suelta un 404 en JSON. Los errores no controlados (incluyendo los de validación e id inválido de Mongoose) los resuelve `middlewares/errorHandler.js`, y `middlewares/logger.js` registra cada petición en consola.