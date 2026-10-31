const express = require("express");
const products = require("../data/products");

const router = express.Router();

// GET /api/productos -> devuelve el listado completo.
router.get("/", (req, res) => {
  res.json(products);
});

// GET /api/productos/:id -> devuelve un producto puntual, o 404 si no existe.
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const producto = products.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ mensaje: `No se encontró el producto con id "${id}".` });
  }

  res.json(producto);
});

module.exports = router;
