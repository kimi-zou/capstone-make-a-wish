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
  };
  return NotificationReceiver;
};
