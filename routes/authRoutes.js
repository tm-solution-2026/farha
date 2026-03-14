const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { authLimiter, otpLimiter } = require('../middleware/rateLimiter');
const { uploadUserAvatar } = require('../middleware/upload');
const {
  registerSchema,
  loginSchema,
  sendOTPSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
  validate
} = require('../validations/authValidation');

// Public routes
router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/send-otp', otpLimiter, validate(sendOTPSchema), authController.sendOTP);
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);
router.put(
  '/profile',
  authenticate,
  uploadUserAvatar,
  validate(updateProfileSchema),
  authController.updateProfile
);
router.post('/change-password', authenticate, validate(changePasswordSchema), authController.changePassword);

module.exports = router;
