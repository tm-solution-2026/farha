module.exports = (sequelize, DataTypes) => {
  const SupplierOffer = sequelize.define('SupplierOffer', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    start_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    offer_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'supplier_offers',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return SupplierOffer;
};
