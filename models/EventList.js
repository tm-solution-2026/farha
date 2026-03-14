module.exports = (sequelize, DataTypes) => {
  const EventList = sequelize.define('EventList', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    list_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    user_event_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user_events',
        key: 'id'
      }
    },
    people_of_event_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'people_of_events',
        key: 'id'
      }
    },
    reminder_date_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'event_lists',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return EventList;
};
