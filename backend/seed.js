// Loads the 11 catalog products into MongoDB.
// Usage (from the backend folder): node seed.js
// WARNING: it deletes every product in the collection before inserting.
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const products = require('./data/products');

// Placeholder stock for the initial load; adjust as needed.
const DEFAULT_STOCK = 10;

// data/products.js uses English keys and a slug `id`; the model uses Spanish
// field names (as in the assignment) and Mongo's own `_id`, so `id` is dropped.
const toDocument = (product) => ({
  nombre: product.name,
  descripcion: product.description,
  precio: product.price,
  stock: DEFAULT_STOCK,
  imagenUrl: product.image,
  medidas: product.size,
  materiales: product.materials,
  acabado: product.finish
});

const seed = async () => {
  await connectDB();

  try {
    await Product.deleteMany({});
    const created = await Product.insertMany(products.map(toDocument));
    console.log(`Seed completo: ${created.length} productos cargados.`);
  } catch (error) {
    console.error('Error al ejecutar el seed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seed();
