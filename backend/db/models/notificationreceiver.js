'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationReceiver = sequelize.define('NotificationReceiver', {
  }, {});
  NotificationReceiver.associate = function(models) {
    NotificationReceiver.belongsTo(models.NotificationObject, {
      as: "notificationObjectId",
    }),
    NotificationReceiver.belongsTo(models.User, {
      as: "receiverId",
    })
  };
  return NotificationReceiver;
};