const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
// 3001 to avoid conflicting with the React dev server.
const PORT = process.env.PORT || 3001;

// Origin of the React client (Vite dev server, 5173 by default). Can be overridden with the CLIENT_ORIGIN env variable.
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

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

// Unknown routes -> JSON 404.
app.use((req, res) => {
    res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// The error handler always goes at the end of the chain.
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});