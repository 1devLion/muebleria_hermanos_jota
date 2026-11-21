const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    default: 0,
    min: [0, 'El stock no puede ser negativo'],
    // Number.isInteger: 3 es válido, 2.5 no
    validate: {
      validator: Number.isInteger,
      message: 'El stock debe ser un número entero'
    }
  },
  imagenUrl: {
    type: String,
    trim: true
  },
  // Optional fields kept from the original catalog (not required by the assignment).
  medidas: String,
  materiales: String,
  acabado: String
}, {
  // Mongoose agrega y mantiene createdAt y updatedAt automáticamente
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
