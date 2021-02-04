'use strict';
module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    status: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    indexes: [{
      unique: true,
      fields: ["userOneId", "userTwoId"],
    }]
  });
  Relationship.associate = function(models) {
    Relationship.belongsTo(models.User, {
      as: "actionUserId"
    }), 
    Relationship.belongsTo(models.User, {
      as: "userOneId"
    }), 
    Relationship.belongsTo(models.User, {
      as: "userTwoId"
    }) 
  };
  return Relationship;
};