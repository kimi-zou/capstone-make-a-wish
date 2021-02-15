'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationReceiver = sequelize.define('NotificationReceiver', {
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  NotificationReceiver.associate = function (models) {
    NotificationReceiver.belongsTo(models.NotificationObject, {
      foreignKey: 'notificationObjectId'
    });
    NotificationReceiver.belongsTo(models.User, {
      foreignKey: 'receiverId'
    });
    NotificationReceiver.belongsTo(models.User, {
      foreignKey: 'actorId'
    });
  };
  // --------------  Static Methods (not work for instances) ---------------
  // 1. Create new entry
  NotificationReceiver.createNew = async function (
    notificationObjectId,
    receiverId,
    actorId,
    status
  ) {
    return await NotificationReceiver.create({
      notificationObjectId,
      receiverId,
      actorId,
      status
    });
  };

  return NotificationReceiver;
};
