const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { User } = require('../models');
const { generateToken } = require('../utils/jwt');
const { generateOTP, saveOTP, verifyOTP } = require('../utils/otp');
const { ConflictError, UnauthorizedError, NotFoundError } = require('../utils/errors');
const { ROLES } = require('../config/constants');

/**
 * Register a new user
 */
const register = async (userData) => {
  const { email, username, password, first_name, last_name, mobile_phone, gender, birthdate, role } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({
    where: {
      [Op.or]: [
        { email },
        { username }
      ]
    }
  });

  if (existingUser) {
    throw new ConflictError('User with this email or username already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    first_name,
    last_name,
    mobile_phone,
    gender,
    birthdate,
    role: role || ROLES.VISITOR,
    register_datetime: new Date()
  });

  // Generate token
  const token = generateToken(user.id);

  return {
    user: user.toJSON(),
    token
  };
};

/**
 * Login user
 */
const login = async (emailOrUsername, password) => {
  // Find user by email or username
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    }
  });

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  // Generate token
  const token = generateToken(user.id);

  return {
    user: user.toJSON(),
    token
  };
};

/**
 * Send OTP for password reset or verification
 */
const sendOTP = async (identifier, type = 'password_reset') => {
  const code = generateOTP();
  await saveOTP(identifier, code);

  // In production, send OTP via SMS or Email
  // For now, we'll return it (remove in production)
  return {
    message: 'OTP code sent successfully',
    code // Remove this in production
  };
};

/**
 * Verify OTP and reset password
 */
const resetPasswordWithOTP = async (identifier, code, newPassword) => {
  // Verify OTP
  const otpResult = await verifyOTP(identifier, code);

  if (!otpResult.valid) {
    throw new UnauthorizedError(otpResult.message);
  }

  // Find user by email or mobile
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { email: identifier },
        { mobile_phone: identifier }
      ]
    }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update password
  await user.update({ password: hashedPassword });

  return {
    message: 'Password reset successfully'
  };
};

/**
 * Change password (for authenticated users)
 */
const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Current password is incorrect');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update password
  await user.update({ password: hashedPassword });

  return {
    message: 'Password changed successfully'
  };
};

/**
 * Get current user profile
 */
const getProfile = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password', 'remember_token'] }
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user.toJSON();
};

/**
 * Update user profile
 */
const updateProfile = async (userId, updateData, avatarPath = null) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Remove password from update data
  delete updateData.password;
  delete updateData.role; // Prevent role changes through profile update

  if (avatarPath) {
    updateData.picture = avatarPath;
  }

  await user.update(updateData);

  return user.toJSON();
};

module.exports = {
  register,
  login,
  sendOTP,
  resetPasswordWithOTP,
  changePassword,
  getProfile,
  updateProfile
};
