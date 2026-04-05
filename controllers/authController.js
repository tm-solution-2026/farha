const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/response');
const { AppError } = require('../utils/errors');

/**
 * Register new user
 */
const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    return sendSuccess(res, 'User registered successfully', result, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 */
const login = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;
    const result = await authService.login(emailOrUsername, password);
    return sendSuccess(res, 'Login successful', result);
  } catch (error) {
    next(error);
  }
};

/**
 * Send OTP
 */
const sendOTP = async (req, res, next) => {
  try {
    const { identifier } = req.body;
    const result = await authService.sendOTP(identifier);
    return sendSuccess(res, result.message, { code: result.code }); //! Remove code in production
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password with OTP
 */
const resetPassword = async (req, res, next) => {
  try {
    const { identifier, code, newPassword } = req.body;
    const result = await authService.resetPasswordWithOTP(identifier, code, newPassword);
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};

/**
 * Change password
 */
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user.id, currentPassword, newPassword);
    return sendSuccess(res, result.message);
  } catch (error) {
    next(error);
  }
};

/**
 * Get current user profile
 */
const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    return sendSuccess(res, 'Profile retrieved successfully', user);
  } catch (error) {
    next(error);
  }
};

/**
 * Update user profile
 * Supports optional avatar image upload (handled by multer middleware)
 */
const updateProfile = async (req, res, next) => {
  try {
    const avatarPath = req.file ? `/uploads/users/${req.file.filename}` : null;
    const user = await authService.updateProfile(req.user.id, req.body, avatarPath);
    return sendSuccess(res, 'Profile updated successfully', user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  sendOTP,
  resetPassword,
  changePassword,
  getProfile,
  updateProfile
};
