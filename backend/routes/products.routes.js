const { Router } = require('express');
const router = Router();

const products = require('../data/products');

// GET /api/productos -> complete list.
router.get('/', (req, res) => {
    res.json({
        ok: true,
        data: products
    });
});

// GET /api/productos/:id -> specific product, or 404 if it doesn't exist..
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const producto = products.find((p) => p.id === id);

    if (!producto) {
        return res.status(404).json({
            ok: false,
            mensaje: `No se encontró el producto con id "${id}".`
        });
    }

    res.json({
        ok: true,
        data: producto
    });
});

module.exports = router;
