module.exports = (sequelize, DataTypes) => {
  const SupplierElement = sequelize.define('SupplierElement', {
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
    element_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'elements',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    expected_time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    note_for_client: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    need_booking_for_period: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    need_booking_for_deliver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    supply_delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'supplier_elements',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return SupplierElement;
};
