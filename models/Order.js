module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    order_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    execute_date_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    order_user_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    order_owner_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return Order;
};
