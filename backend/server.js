const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
// 3001 to avoid conflicting with the React dev server (which uses 3000 by default).
const PORT = process.env.PORT || 3001;

// Origin of the React client (dev server). Can be overridden with the CLIENT_ORIGIN env variable.
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';

app.use(logger);
app.use(express.json());

// CORS enabled only for the client.
app.use(cors({ origin: CLIENT_ORIGIN }));

app.get('/', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Bienvenido al servidor de Mueblería Hermanos Jota'
    });
});

const productosRouter = require('./routes/products.routes');
app.use('/api/productos', productosRouter);

// TODO (Ramiro): register the 404 middleware (notFound.js) here, after the routes.

// The error handler always goes at the end of the chain.
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});
