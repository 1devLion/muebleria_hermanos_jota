# Backend - Mueblería Hermanos Jota

API REST en Node.js + Express conectada a MongoDB (Atlas) con Mongoose. Ofrece el CRUD completo de productos.

**En producción:** https://muebleria-hermanos-jota-ntpd.onrender.com

> Está en el plan gratuito de Render: se duerme tras unos minutos sin uso y la primera petición puede tardar cerca de un minuto.

## Requisitos

- **Node.js 20.19 o superior** (lo exige Mongoose 9; conviene declararlo en `engines` de `package.json` para que Render use una versión compatible).
- Una base de datos en MongoDB Atlas.

## Puesta en marcha

```bash
npm install
node seed.js   # carga el catálogo inicial (solo la primera vez, o para restaurarlo)
npm start
```

> **Atención:** `seed.js` borra todos los productos de la colección antes de insertar los 11 del catálogo original (con `stock` 10 cada uno). Usalo para restaurar el catálogo, no cuando haya productos cargados que quieras conservar.

La API queda en `http://localhost:3001`.

## Variables de entorno

Se definen en `backend/.env` (ese archivo **no se sube al repo**; la plantilla es `.env.example`). En producción se cargan en el panel de Render, en Environment.

| Variable | Obligatoria | Descripción |
|---|---|---|
| `MONGODB_URI` | Sí | Cadena de conexión de Atlas, con el nombre de la base antes del `?` (por ejemplo `.../muebleria-jota?retryWrites=true&w=majority`). Es un secreto: nunca va en el repo. |
| `PORT` | No | Puerto de la API. Por defecto `3001`. Render lo define solo. |
| `CLIENT_ORIGIN` | No | Origen del frontend permitido por CORS. Por defecto `http://localhost:5173`. En producción, la URL exacta del frontend desplegado, con `https://` y sin barra final. |

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
| PUT | `/api/productos/:id` | Actualiza un producto existente. | 200, 400 (id o datos inválidos), 404 |
| DELETE | `/api/productos/:id` | Elimina un producto. | 200, 400 (id inválido), 404 |

> **Sin autenticación:** las rutas POST, PUT y DELETE son públicas, porque la consigna no pide login. Cualquiera que conozca la URL puede modificar el catálogo; `node seed.js` lo restaura (borrando lo que se haya cargado de más).

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

Responde con el producto creado, incluido su `_id`. Si falta `nombre` o `precio`, responde `400`.

**PUT `/api/productos/:id`** → `200`

```json
{ "precio": 130000, "stock": 8 }
```

Responde con el producto ya actualizado. Si no existe, responde `404`.

**DELETE `/api/productos/:id`** → `200`

```json
{ "mensaje": "Producto eliminado." }
```

Si no existe, responde `404`.

## Errores

Los errores responden en JSON con la forma `{ "mensaje": "..." }`:

| Caso | Código | Mensaje |
|---|---|---|
| Producto inexistente (GET, PUT o DELETE por id) | 404 | `Producto no encontrado.` |
| `id` con formato inválido | 400 | `El id no es válido.` |
| Falla la validación del modelo (POST o PUT) | 400 | Los mensajes del esquema unidos con `. `, por ejemplo `El nombre es obligatorio. El precio es obligatorio` |
| Ruta inexistente | 404 | `Ruta no encontrada: GET /ruta` |
| Error no previsto | 500 | El mensaje del error |

Los errores de validación e id inválido de Mongoose los resuelve `middlewares/errorHandler.js`, y `middlewares/logger.js` registra cada petición en consola.

## Despliegue en Render

- **Root Directory:** `backend`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Variables:** `MONGODB_URI` y `CLIENT_ORIGIN`. `PORT` no hace falta.
- En MongoDB Atlas, Network Access tiene que permitir `0.0.0.0/0`; si solo está la IP de una persona, Render no puede conectarse y el servidor falla con un `MongooseServerSelectionError`.