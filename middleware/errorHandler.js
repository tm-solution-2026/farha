const { sendError, sendServerError } = require('../utils/response');
const { AppError } = require('../utils/errors');

/**
 * Global Error Handler Middleware
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Sequelize Validation Error
  if (err.name === 'SequelizeValidationError') {
    const message = 'Validation Error';
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return sendError(res, message, errors, 400);
  }

  // Sequelize Unique Constraint Error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = 'Duplicate entry. This resource already exists.';
    const errors = err.errors.map(e => ({
      field: e.path,
      message: e.message
    }));
    return sendError(res, message, errors, 409);
  }

  // Sequelize Foreign Key Constraint Error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    const message = 'Foreign key constraint violation. Related resource does not exist.';
    return sendError(res, message, null, 400);
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Invalid token', null, 401);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Token expired', null, 401);
  }

  // Custom App Error
  if (err instanceof AppError) {
    return sendError(res, err.message, err.errors || null, err.statusCode);
  }

  // Default server error
  return sendServerError(res, error.message || 'Internal server error');
};

/**
 * 404 Not Found Handler
 */
const notFoundHandler = (req, res) => {
  return sendError(res, `Route ${req.originalUrl} not found`, null, 404);
};

module.exports = {
  errorHandler,
  notFoundHandler
};
