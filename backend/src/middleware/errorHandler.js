const logger = require('../config/logger');

function notFoundHandler(req, res) {
  return res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(error, _req, res, _next) {
  logger.error(error.stack || error.message);

  if (error.name === 'ValidationError') {
    return res.status(400).json({ message: error.message });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
