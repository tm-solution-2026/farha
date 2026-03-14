module.exports = (sequelize, DataTypes) => {
  const SupplierBooking = sequelize.define('SupplierBooking', {
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
    client_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    start_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deliver_datetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    booking_status: {
      type: DataTypes.ENUM('final_confirmed', 'initial_unconfirmed'),
      allowNull: false,
      defaultValue: 'initial_unconfirmed'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    with_delivery: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'supplier_bookings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return SupplierBooking;
};
