const { Router } = require('express');
const router = Router();

const products = require('../data/products');

router.get('/', (req, res) => {
    res.json({
        ok: true,
        data: products
    });
});

module.exports = router;
