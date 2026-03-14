module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    report_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    report_user_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    reported_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    reported_user_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    plain_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'pending'
    },
    result: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    report_date_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'reports',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return Report;
};
