const { OtpCode } = require('../models');

/**
 * Generate random OTP code
 */
const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

/**
 * Save OTP to database
 */
const saveOTP = async (identifier, code) => {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + parseInt(process.env.OTP_EXPIRE_MINUTES || 10));

  // Delete old OTPs for this identifier
  await OtpCode.destroy({
    where: { identifier }
  });

  // Create new OTP
  return await OtpCode.create({
    identifier,
    code,
    expires_at: expiresAt
  });
};

/**
 * Verify OTP code
 */
const verifyOTP = async (identifier, code) => {
  const otpRecord = await OtpCode.findOne({
    where: {
      identifier,
      code
    }
  });

  if (!otpRecord) {
    return { valid: false, message: 'Invalid OTP code' };
  }

  if (new Date() > new Date(otpRecord.expires_at)) {
    await OtpCode.destroy({ where: { id: otpRecord.id } });
    return { valid: false, message: 'OTP code has expired' };
  }

  // Delete used OTP
  await OtpCode.destroy({ where: { id: otpRecord.id } });

  return { valid: true, message: 'OTP verified successfully' };
};

module.exports = {
  generateOTP,
  saveOTP,
  verifyOTP
};
