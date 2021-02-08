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
      allowNull: false,
      defaultValue: 1
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});

  Wish.associate = function (models) {
    Wish.hasMany(models.WishImage, {
      foreignKey: 'wishId',
      onDelete: 'cascade',
      hooks: true
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

  // 2. create new wish
  Wish.createWish = async function ({ title, description, link, quantity, userId }) {
    const wish = await Wish.create({
      title,
      description,
      link,
      quantity,
      userId
    });
    return await Wish.findByPk(wish.id);
  };

  // 3. get single wish by id
  Wish.getWishById = async function (id, WishImage) {
    return await Wish.findOne({
      where: { id: id },
      include: WishImage
    });
  };

  // 4. delete a wish
  Wish.deleteWish = async function (id) {
    const wish = await Wish.findByPk(id);
    return await wish.destroy();
  };

  return Wish;
};
