const { Op } = require('sequelize');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define('Relationship', {
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['userOneId', 'userTwoId']
    }]
  });
  Relationship.associate = function (models) {
    Relationship.belongsTo(models.User, {
      foreignKey: 'actionUserId'
    });
    Relationship.belongsTo(models.User, {
      foreignKey: 'userOneId'
    });
    Relationship.belongsTo(models.User, {
      foreignKey: 'userTwoId'
    });
  };

  // Friendship lookup
  Relationship.friendshipLookup = async function (userId) {
    const friends = await Relationship.findAll({
      where: {
        status: 1,
        [Op.or]: [
          { userOneId: userId },
          { userTwoId: userId }
        ]
      }
    });
    return friends;
  };

  return Relationship;
};
