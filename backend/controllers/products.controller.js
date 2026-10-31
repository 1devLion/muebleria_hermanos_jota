const Product = require("../models/Product");

// Lista todos los productos de la base.
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err); // lo resuelve el errorHandler
  }
};

// Devuelve un producto por _id, o 404 si no existe.
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};
