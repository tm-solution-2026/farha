const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { User } = require('../models');
const nodemailer = require('nodemailer');
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

// Configure the email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 465,               
  secure: true,            
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
 
  tls: {
    rejectUnauthorized: false 
  },
  family: 4 
});

/**
 * Send OTP for password reset or verification
 */
const sendOTP = async (identifier, type = 'password_reset') => {
  try {
    // 1. Check if identifier is an email (Simple validation)
    const isEmail = identifier.includes('@');

    if (!isEmail) {
      // If you plan to add SMS later, you handle it here. 
      // For now, we reject non-email identifiers.
      throw new Error('Currently, OTP can only be sent via email.');
    }

    // 2. Verify that the user actually exists in the database
    const user = await User.findOne({
      where: { email: identifier }
    });

    if (!user) {
      throw new NotFoundError('User not found with this email');
    }

    // 3. Generate and save the OTP
    const code = generateOTP();
    await saveOTP(identifier, code);

    const actionType = type === 'password_reset' ? 'إعادة تعيين كلمة المرور' : 'التحقق من حسابك';

    const htmlTemplate = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; background-color: #FFFBF6;">
  <div style="background-color: #FFFBF6; padding: 40px 20px; font-family: 'Tajawal', Tahoma, Arial, sans-serif; direction: rtl; text-align: right;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05); overflow: hidden;">
      
      <div style="background-color: #A73E94; padding: 25px 20px; text-align: center;">
        <img src="https://i.postimg.cc/vm1C1Snw/Artboard-5-copy-2-4x.png" alt="Farha Logo" style="max-height: 60px; width: auto; display: block; margin: 0 auto; border: 0;">
      </div>

      <div style="padding: 40px 30px; color: #2C2F31;">
        <p style="font-size: 18px; margin-bottom: 20px; font-weight: 500;">مرحباً ${user.first_name || ''}،</p>
        <p style="font-size: 16px; margin-bottom: 30px; line-height: 1.6;">
          لقد طلبت مؤخراً رمزاً من أجل <strong>${actionType}</strong>. إليك رمز التحقق الخاص بك:
        </p>

        <div style="text-align: center; margin: 40px 0; direction: ltr;">
          <span style="display: inline-block; background-color: #FEC435; color: #2C2F31; font-size: 34px; font-weight: 700; letter-spacing: 8px; padding: 15px 35px; border-radius: 6px; box-shadow: 0 2px 4px rgba(44, 47, 49, 0.1);">
            ${code}
          </span>
        </div>

        <p style="font-size: 15px; color: #2C2F31; opacity: 0.8; line-height: 1.6; margin-top: 30px;">
          يرجى عدم مشاركة هذا الرمز مع أي شخص. إذا لم تقم بطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بأمان.
        </p>
      </div>

      <div style="background-color: #FFFBF6; padding: 20px; text-align: center; border-top: 1px solid rgba(44, 47, 49, 0.1);">
        <p style="margin: 0; font-size: 13px; color: #2C2F31; opacity: 0.7;">
          &copy; ${new Date().getFullYear()} Farha. جميع الحقوق محفوظة.
        </p>
      </div>

    </div>
  </div>
</body>
</html>
`;
    // 4. Prepare the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: identifier,
      subject: type === 'password_reset' ? 'رمز إعادة تعيين كلمة المرور' : 'رمز التحقق الخاص بك',
      text: `مرحباً ${user.first_name || ''}،\n\nرمز التحقق الخاص بك هو: ${code}\n\nيرجى عدم مشاركة هذا الرمز مع أي شخص.`,
      html: htmlTemplate
    };

    // 5. Send the email
    await transporter.sendMail(mailOptions);

    return {
      success: true,
      message: 'OTP sent successfully to your email address'
    };

  } catch (error) {
    console.error('Error sending OTP:', error);
    // Rethrow custom errors (like NotFoundError) as they are, otherwise throw generic error
    if (error.statusCode) throw error;
    throw new Error('Failed to send OTP. Please try again later.');
  }
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
