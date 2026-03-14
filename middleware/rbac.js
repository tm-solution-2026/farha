const { sendForbidden } = require('../utils/response');
const { ForbiddenError } = require('../utils/errors');
const { ROLES } = require('../config/constants');

/**
 * Role-Based Access Control Middleware
 * Checks if user has required role(s)
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new ForbiddenError('Authentication required');
      }

      // Check if user role is in allowed roles
      if (!allowedRoles.includes(req.user.role)) {
        throw new ForbiddenError(
          `Access denied. Required role: ${allowedRoles.join(' or ')}`
        );
      }

      next();
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return sendForbidden(res, error.message);
      }
      next(error);
    }
  };
};

/**
 * Middleware to check if user is platform admin
 */
const isPlatformAdmin = authorize(ROLES.PLATFORM_ADMIN);

/**
 * Middleware to check if user is service provider
 */
const isServiceProvider = authorize(ROLES.SERVICE_PROVIDER);

/**
 * Middleware to check if user is blog admin
 */
const isBlogAdmin = authorize(ROLES.BLOG_ADMIN);

/**
 * Middleware to check if user is visitor or service provider
 */
const isVisitorOrProvider = authorize(ROLES.VISITOR, ROLES.SERVICE_PROVIDER);

/**
 * Middleware to check if user owns the resource
 */
const isOwner = (model, idParam = 'id') => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[idParam];
      const Model = require(`../models/${model}`);

      const resource = await Model.findByPk(resourceId);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }

      // Check if resource belongs to user
      if (resource.user_id !== req.user.id && req.user.role !== ROLES.PLATFORM_ADMIN) {
        throw new ForbiddenError('You do not have permission to access this resource');
      }

      req.resource = resource;
      next();
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return sendForbidden(res, error.message);
      }
      next(error);
    }
  };
};

module.exports = {
  authorize,
  isPlatformAdmin,
  isServiceProvider,
  isBlogAdmin,
  isVisitorOrProvider,
  isOwner
};
