const { Supplier, SupplierElement, Element, ElementCategory, Category, Subcategory } = require('../models');
const { sendSuccess } = require('../utils/response');
const { NotFoundError } = require('../utils/errors');

/**
 * Get all suppliers
 */
const getAllSuppliers = async (req, res, next) => {
  try {
    const { status, element_category_id } = req.query;
    const where = {};
    
    if (status) {
      where.status = status;
    }

    const suppliers = await Supplier.findAll({
      where,
      include: [
        {
          model: SupplierElement,
          as: 'supplierElements',
          include: [
            {
              model: Element,
              as: 'element',
              include: [
                {
                  model: ElementCategory,
                  as: 'elementCategory'
                }
              ]
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    return sendSuccess(res, 'Suppliers retrieved successfully', suppliers);
  } catch (error) {
    next(error);
  }
};

/**
 * Get supplier by ID
 */
const getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findByPk(id, {
      include: [
        {
          model: SupplierElement,
          as: 'supplierElements',
          include: [
            {
              model: Element,
              as: 'element',
              include: [
                {
                  model: ElementCategory,
                  as: 'elementCategory'
                }
              ]
            }
          ]
        }
      ]
    });

    if (!supplier) {
      throw new NotFoundError('Supplier not found');
    }

    return sendSuccess(res, 'Supplier retrieved successfully', supplier);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new supplier (Platform Admin only)
 * Supports optional picture/logo uploads
 */
const createSupplier = async (req, res, next) => {
  try {
    const payload = { ...req.body };

    if (req.files && req.files.picture && req.files.picture[0]) {
      payload.picture = `/uploads/suppliers/${req.files.picture[0].filename}`;
    }

    if (req.files && req.files.logo && req.files.logo[0]) {
      payload.logo = `/uploads/suppliers/${req.files.logo[0].filename}`;
    }

    const supplier = await Supplier.create(payload);
    return sendSuccess(res, 'Supplier created successfully', supplier, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update supplier (Platform Admin or Supplier Owner)
 * Supports optional picture/logo uploads
 */
const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      throw new NotFoundError('Supplier not found');
    }

    const updates = { ...req.body };

    if (req.files && req.files.picture && req.files.picture[0]) {
      updates.picture = `/uploads/suppliers/${req.files.picture[0].filename}`;
    }

    if (req.files && req.files.logo && req.files.logo[0]) {
      updates.logo = `/uploads/suppliers/${req.files.logo[0].filename}`;
    }

    await supplier.update(updates);
    return sendSuccess(res, 'Supplier updated successfully', supplier);
  } catch (error) {
    next(error);
  }
};

/**
 * Get supplier elements/services
 */
const getSupplierElements = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { element_id, category_id } = req.query;

    const where = { supplier_id: id };
    if (element_id) where.element_id = element_id;

    const supplierElements = await SupplierElement.findAll({
      where,
      include: [
        {
          model: Element,
          as: 'element',
          include: [
            {
              model: ElementCategory,
              as: 'elementCategory'
            }
          ]
        },
        {
          model: Supplier,
          as: 'supplier'
        }
      ]
    });

    return sendSuccess(res, 'Supplier elements retrieved successfully', supplierElements);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  getSupplierElements
};
