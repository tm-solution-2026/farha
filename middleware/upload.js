const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { AppError } = require('../utils/errors');

const UPLOAD_ROOT = path.join(__dirname, '..', 'uploads');
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

const createImageStorage = (subfolder) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const targetDir = path.join(UPLOAD_ROOT, subfolder);
      try {
        ensureDirExists(targetDir);
        cb(null, targetDir);
      } catch (err) {
        cb(err);
      }
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const baseName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, '');
      const timestamp = Date.now();
      const safeName = `${baseName || 'image'}-${timestamp}${ext}`;
      cb(null, safeName);
    }
  });

const imageFileFilter = (req, file, cb) => {
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new AppError('Only image files (JPEG, PNG, WebP) are allowed', 400));
  }
  cb(null, true);
};

const createImageUploader = (subfolder, fieldName) =>
  multer({
    storage: createImageStorage(subfolder),
    fileFilter: imageFileFilter,
    limits: {
      fileSize: MAX_FILE_SIZE_BYTES
    }
  }).single(fieldName);

const createMultiFieldImageUploader = (subfolder, fields) =>
  multer({
    storage: createImageStorage(subfolder),
    fileFilter: imageFileFilter,
    limits: {
      fileSize: MAX_FILE_SIZE_BYTES
    }
  }).fields(fields);

// Specific upload middlewares for different resources
const uploadUserAvatar = createImageUploader('users', 'avatar');
const uploadEventCover = createImageUploader('events', 'cover_image');
const uploadElementImage = createImageUploader('elements', 'image');
const uploadSupplierImages = createMultiFieldImageUploader('suppliers', [
  { name: 'picture', maxCount: 1 },
  { name: 'logo', maxCount: 1 }
]);

module.exports = {
  uploadUserAvatar,
  uploadEventCover,
  uploadElementImage,
  uploadSupplierImages
};

