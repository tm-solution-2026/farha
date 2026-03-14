const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticate } = require('../middleware/auth');
const { isPlatformAdmin } = require('../middleware/rbac');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

// Protected routes - Platform Admin only
router.post('/', authenticate, isPlatformAdmin, categoryController.createCategory);
router.put('/:id', authenticate, isPlatformAdmin, categoryController.updateCategory);
router.delete('/:id', authenticate, isPlatformAdmin, categoryController.deleteCategory);

module.exports = router;

