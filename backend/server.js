const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
// 3001 to avoid conflicting with the React dev server (which uses 3000 by default).
const PORT = process.env.PORT || 3001;

app.use(logger);
app.use(express.json());
app.use(cors());

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
