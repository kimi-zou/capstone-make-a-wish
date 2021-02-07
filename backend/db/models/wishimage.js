'use strict';
module.exports = (sequelize, DataTypes) => {
  const WishImage = sequelize.define('WishImage', {
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  WishImage.associate = function (models) {
    WishImage.belongsTo(models.Wish, {
      foreignKey: 'wishId'
    });
  };

  // --------------  Static Methods (not work for instances) ---------------
  // 1. create new wish image
  WishImage.createWishImage = async function ({ image, wishId }) {
    const newImage = await WishImage.create({ image, wishId });
    return await WishImage.findByPk(newImage.id);
  };

  return WishImage;
};
