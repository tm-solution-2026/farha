const Joi = require('joi');

/**
 * Register validation schema
 */
const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(255).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters',
    'any.required': 'First name is required'
  }),
  last_name: Joi.string().min(2).max(255).required().messages({
    'string.empty': 'Last name is required',
    'string.min': 'Last name must be at least 2 characters',
    'any.required': 'Last name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': 'Username must contain only letters and numbers',
    'string.min': 'Username must be at least 3 characters',
    'string.max': 'Username must not exceed 30 characters',
    'any.required': 'Username is required'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  }),
  mobile_phone: Joi.string().pattern(/^[0-9+]+$/).optional().messages({
    'string.pattern.base': 'Mobile phone must contain only numbers and +'
  }),
  gender: Joi.string().valid('male', 'female').optional(),
  birthdate: Joi.date().max('now').optional().messages({
    'date.max': 'Birthdate cannot be in the future'
  }),
  role: Joi.string().valid('platform_admin', 'service_provider', 'visitor', 'blog_admin').optional()
});

/**
 * Login validation schema
 */
const loginSchema = Joi.object({
  emailOrUsername: Joi.string().required().messages({
    'string.empty': 'Email or username is required',
    'any.required': 'Email or username is required'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  })
});

/**
 * Send OTP validation schema
 */
const sendOTPSchema = Joi.object({
  identifier: Joi.string().required().messages({
    'string.empty': 'Email or mobile phone is required',
    'any.required': 'Email or mobile phone is required'
  })
});

/**
 * Reset password validation schema
 */
const resetPasswordSchema = Joi.object({
  identifier: Joi.string().required().messages({
    'string.empty': 'Email or mobile phone is required',
    'any.required': 'Email or mobile phone is required'
  }),
  code: Joi.string().length(6).required().messages({
    'string.length': 'OTP code must be 6 digits',
    'string.empty': 'OTP code is required',
    'any.required': 'OTP code is required'
  }),
  newPassword: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  })
});

/**
 * Change password validation schema
 */
const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'string.empty': 'Current password is required',
    'any.required': 'Current password is required'
  }),
  newPassword: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.empty': 'New password is required',
    'any.required': 'New password is required'
  })
});

/**
 * Update profile validation schema
 */
const updateProfileSchema = Joi.object({
  first_name: Joi.string().min(2).max(255).optional(),
  last_name: Joi.string().min(2).max(255).optional(),
  mobile_phone: Joi.string().pattern(/^[0-9+]+$/).optional(),
  gender: Joi.string().valid('male', 'female').optional(),
  birthdate: Joi.date().max('now').optional(),
  picture: Joi.string().uri().optional()
});

/**
 * Validation middleware
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    req.body = value;
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  sendOTPSchema,
  resetPasswordSchema,
  changePasswordSchema,
  updateProfileSchema,
  validate
};
