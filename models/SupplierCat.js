module.exports = (sequelize, DataTypes) => {
  const SupplierCat = sequelize.define('SupplierCat', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    supplier_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'suppliers',
        key: 'id'
      }
    },
    element_category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'element_categories',
        key: 'id'
      }
    },
    years_of_experience: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'active'
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'supplier_cats',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return SupplierCat;
};
