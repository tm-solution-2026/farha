const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { authenticate } = require('../middleware/auth');
const { isPlatformAdmin } = require('../middleware/rbac');
const { uploadSupplierImages } = require('../middleware/upload');

// Public routes
router.get('/', supplierController.getAllSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.get('/:id/elements', supplierController.getSupplierElements);

// Protected routes - Platform Admin only
router.post('/', authenticate, isPlatformAdmin, uploadSupplierImages, supplierController.createSupplier);
router.put('/:id', authenticate, isPlatformAdmin, uploadSupplierImages, supplierController.updateSupplier);

module.exports = router;
