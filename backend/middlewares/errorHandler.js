// Centralized error handling middleware.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  const mensaje = err.message || "Internal Server Error";

  res.status(status).json({ mensaje });
};

module.exports = errorHandler;
