const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const { authenticate } = require('../middleware/auth');
const { isPlatformAdmin } = require('../middleware/rbac');

// Public routes
router.get('/', subcategoryController.getAllSubcategories);
router.get('/:id', subcategoryController.getSubcategoryById);

// Protected routes - Platform Admin only
router.post('/', authenticate, isPlatformAdmin, subcategoryController.createSubcategory);
router.put('/:id', authenticate, isPlatformAdmin, subcategoryController.updateSubcategory);
router.delete('/:id', authenticate, isPlatformAdmin, subcategoryController.deleteSubcategory);

module.exports = router;

