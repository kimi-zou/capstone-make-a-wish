'use strict';
module.exports = (sequelize, DataTypes) => {
  const EntityType = sequelize.define('EntityType', {
    entity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    } 
  }, {});
  EntityType.associate = function(models) {
    EntityType.hasMany(models.NotificationObject, {
      foreignKey: "entityTypeId"
    })
  };
  return EntityType;
};