module.exports = (sequelize, DataTypes) => {
  const SupplierElementCategory = sequelize.define('SupplierElementCategory', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    supplier_element_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'supplier_elements',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    subcategory_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'subcategories',
        key: 'id'
      }
    }
  }, {
    tableName: 'supplier_element_categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return SupplierElementCategory;
};
