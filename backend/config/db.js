const mongoose = require('mongoose');

// Connects to MongoDB using the connection string from the environment.
// The caller is responsible for loading dotenv before calling this function.
const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('Falta la variable de entorno MONGODB_URI (revisá backend/.env).');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB conectado: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('No se pudo conectar a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
