'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationObject = sequelize.define('NotificationObject', {
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  NotificationObject.associate = function (models) {
    NotificationObject.belongsTo(models.EntityType, {
      foreignKey: 'entityTypeId'
    });
    NotificationObject.hasOne(models.NotificationActor, {
      foreignKey: 'notificationObjectId'
    });
    NotificationObject.hasMany(models.NotificationReceiver, {
      foreignKey: 'notificationObjectId'
    });
  };

  // --------------  Static Methods (not work for instances) ---------------
  // 1. Create new notification
  NotificationObject.createNewNotification = async function (type, entity) {
    return await NotificationObject.create({
      entityTypeId: type,
      entityId: entity
    });
  };

  return NotificationObject;
};
