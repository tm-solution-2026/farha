/**
 * Standard API Response Utility
 * Provides consistent response format across all endpoints
 */

const sendResponse = (res, statusCode, success, message, data = null, errors = null) => {
  const response = {
    success,
    message,
    ...(data && { data }),
    ...(errors && { errors })
  };

  return res.status(statusCode).json(response);
};

const sendSuccess = (res, message, data = null, statusCode = 200) => {
  return sendResponse(res, statusCode, true, message, data);
};

const sendError = (res, message, errors = null, statusCode = 400) => {
  return sendResponse(res, statusCode, false, message, null, errors);
};

const sendUnauthorized = (res, message = 'Unauthorized access') => {
  return sendResponse(res, 401, false, message);
};

const sendForbidden = (res, message = 'Forbidden: Insufficient permissions') => {
  return sendResponse(res, 403, false, message);
};

const sendNotFound = (res, message = 'Resource not found') => {
  return sendResponse(res, 404, false, message);
};

const sendServerError = (res, message = 'Internal server error', errors = null) => {
  return sendResponse(res, 500, false, message, null, errors);
};

module.exports = {
  sendResponse,
  sendSuccess,
  sendError,
  sendUnauthorized,
  sendForbidden,
  sendNotFound,
  sendServerError
};
