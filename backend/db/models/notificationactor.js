'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationActor = sequelize.define('NotificationActor', {
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  NotificationActor.associate = function (models) {
    NotificationActor.belongsTo(models.NotificationObject, {
      foreignKey: 'notificationObjectId'
    });
    NotificationActor.belongsTo(models.User, {
      foreignKey: 'actorId'
    });
  };
  return NotificationActor;
};
