'use strict';
module.exports = (sequelize, DataTypes) => {
  const NotificationObject = sequelize.define('NotificationObject', {
    entityId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  NotificationObject.associate = function(models) {
    NotificationObject.belongsTo(models.EntityType, {
      as: "entityTypeId"
    }),
    NotificationObject.hasOne(models.NotificationActor, {
      foreignKey: "entityTypeId"
    }),
    NotificationObject.hasMany(models.NotificationReceiver, {
      foreignKey: "entityTypeId"
    })
  };
  return NotificationObject;
};