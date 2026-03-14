const { Category } = require('../models');
const { sendSuccess } = require('../utils/response');
const { NotFoundError } = require('../utils/errors');

/**
 * Get all categories
 */
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [['created_at', 'DESC']]
    });
    return sendSuccess(res, 'Categories retrieved successfully', categories);
  } catch (error) {
    next(error);
  }
};

/**
 * Get category by ID
 */
const getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    return sendSuccess(res, 'Category retrieved successfully', category);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new category (Platform Admin only)
 */
const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    return sendSuccess(res, 'Category created successfully', category, 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Update category (Platform Admin only)
 */
const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    await category.update(req.body);
    return sendSuccess(res, 'Category updated successfully', category);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete category (Platform Admin only)
 */
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      throw new NotFoundError('Category not found');
    }

    await category.destroy();
    return sendSuccess(res, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};

