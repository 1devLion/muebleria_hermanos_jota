const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
// Origin of the React client (Vite dev server). Override with CLIENT_ORIGIN.
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(logger);
app.use(express.json());
// CORS enabled only for the client, not for any origin.
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

// Must be the last middleware.
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});
