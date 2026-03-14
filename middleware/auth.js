const jwt = require('jsonwebtoken');
const { sendUnauthorized } = require('../utils/response');
const { UnauthorizedError } = require('../utils/errors');
const { User } = require('../models');

/**
 * JWT Authentication Middleware
 * Verifies JWT token and attaches user to request
 */
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new UnauthorizedError('Authentication required. Please provide a token.');
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });

      if (!user) {
        throw new UnauthorizedError('User not found. Token is invalid.');
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired token.');
    }
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return sendUnauthorized(res, error.message);
    }
    next(error);
  }
};

module.exports = {
  authenticate
};
