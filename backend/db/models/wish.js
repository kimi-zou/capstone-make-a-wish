'use strict';
// const WishImage = require('./wishimage');

module.exports = (sequelize, DataTypes) => {
  const Wish = sequelize.define('Wish', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});

  Wish.associate = function (models) {
    Wish.hasMany(models.WishImage, {
      foreignKey: 'wishId'
    });
    Wish.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };

  // --------------  Static Methods (not work for instances) ---------------
  // 1. get wishes by user id
  Wish.getWishesByUserId = async function (userId, WishImage) {
    return await Wish.findAll({
      where: {
        userId: userId
      },
      include: WishImage
    });
  };

  return Wish;
};
