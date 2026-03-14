module.exports = (sequelize, DataTypes) => {
  const EventElement = sequelize.define('EventElement', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'events',
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
    event_member_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'event_members',
        key: 'id'
      }
    },
    order_in_event: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    importance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'active'
    },
    logo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'event_elements',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return EventElement;
};
