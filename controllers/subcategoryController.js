const { Subcategory } = require('../models');
const { sendSuccess } = require('../utils/response');
const { NotFoundError } = require('../utils/errors');

/**
 * Get all subcategories
 */
const getAllSubcategories = async (req, res, next) => {
  try {
    const subcategories = await Subcategory.findAll({
      order: [['created_at', 'DESC']]
    });
    return sendSuccess(res, 'Subcategories retrieved successfully', subcategories);
  } catch (error) {
    next(error);
  }
};

/**
 * Get subcategory by ID
 */
const getSubcategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findByPk(id);

    if (!subcategory) {
      throw new NotFoundError('Subcategory not found');
    }

    return sendSuccess(res, 'Subcategory retrieved successfully', subcategory);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new subcategory (Platform Admin only)
 */
const createSubcategory = async (req, res, next) => {
  try {
    const subcategory = await Subcategory.create(req.body);
    return sendSuccess(res, 'Subcategory created successfully', subcategory, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update subcategory (Platform Admin only)
 */
const updateSubcategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findByPk(id);

    if (!subcategory) {
      throw new NotFoundError('Subcategory not found');
    }

    await subcategory.update(req.body);
    return sendSuccess(res, 'Subcategory updated successfully', subcategory);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete subcategory (Platform Admin only)
 */
const deleteSubcategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findByPk(id);

    if (!subcategory) {
      throw new NotFoundError('Subcategory not found');
    }

    await subcategory.destroy();
    return sendSuccess(res, 'Subcategory deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
};

