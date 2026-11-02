// Manejo centralizado de errores: siempre responde { mensaje }.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // El _id no tiene formato de ObjectId.
  if (err.name === "CastError") {
    return res.status(400).json({ mensaje: "El id no es válido." });
  }

  // Falló la validación del esquema (ej.: falta el nombre).
  if (err.name === "ValidationError") {
    const mensaje = Object.values(err.errors)
      .map((e) => e.message)
      .join(". ");
    return res.status(400).json({ mensaje });
  }

  const status = err.status || 500;
  const mensaje = err.message || "Internal Server Error";
  res.status(status).json({ mensaje });
};

module.exports = errorHandler;
