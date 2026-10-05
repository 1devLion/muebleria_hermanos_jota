// Logging middleware: logs the HTTP method and URL of each incoming request.
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

module.exports = logger;
