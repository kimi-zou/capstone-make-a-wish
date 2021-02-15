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
  // --------------  Static Methods (not work for instances) ---------------
  // 1. Create new entry
  NotificationActor.createNew = async function (
    notificationObjectId,
    actorId,
    status
  ) {
    return await NotificationActor.create({
      notificationObjectId,
      actorId,
      status
    });
  };
  return NotificationActor;
};
