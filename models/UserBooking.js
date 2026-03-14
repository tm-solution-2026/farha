module.exports = (sequelize, DataTypes) => {
  const UserBooking = sequelize.define('UserBooking', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    user_event_items_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user_event_items',
        key: 'id'
      }
    },
    supplier_element_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'supplier_elements',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    start_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deliver_date_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    booking_status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'pending'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
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
    tableName: 'user_bookings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return UserBooking;
};
