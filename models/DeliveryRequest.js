module.exports = (sequelize, DataTypes) => {
  const DeliveryRequest = sequelize.define('DeliveryRequest', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    user_booking_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user_bookings',
        key: 'id'
      }
    },
    is_supplier_booking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    delivery_address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    delivery_phone: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'pending'
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    }
  }, {
    tableName: 'delivery_requests',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return DeliveryRequest;
};
