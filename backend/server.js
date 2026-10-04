const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});