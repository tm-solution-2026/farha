module.exports = (sequelize, DataTypes) => {
  const SubscribePolicy = sequelize.define('SubscribePolicy', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cost: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false
    }
  }, {
    tableName: 'subscribe_policies',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return SubscribePolicy;
};
