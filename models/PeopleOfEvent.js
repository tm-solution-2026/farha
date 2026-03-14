module.exports = (sequelize, DataTypes) => {
  const PeopleOfEvent = sequelize.define('PeopleOfEvent', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    user_event_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user_events',
        key: 'id'
      }
    },
    event_member_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'event_members',
        key: 'id'
      }
    }
  }, {
    tableName: 'people_of_events',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    underscored: false
  });

  return PeopleOfEvent;
};
