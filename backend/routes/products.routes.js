const express = require("express");
const products = require("../data/products");

const router = express.Router();

// GET /api/productos -> devuelve el listado completo.
router.get("/", (req, res) => {
  res.json(products);
});

module.exports = router;
