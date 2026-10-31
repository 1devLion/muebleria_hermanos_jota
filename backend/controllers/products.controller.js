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

// Crea un producto y responde 201.
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Actualiza un producto; new devuelve el actualizado y runValidators aplica el esquema.
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Elimina un producto; respondo 200 con JSON para que el frontend pueda leer la respuesta.
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }
    res.json({ mensaje: "Producto eliminado." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

