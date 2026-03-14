module.exports = (sequelize, DataTypes) => {
  const PlatformService = sequelize.define('PlatformService', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    ar_service_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    en_service_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    for_suppliers: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    for_users: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'platform_services',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return PlatformService;
};
