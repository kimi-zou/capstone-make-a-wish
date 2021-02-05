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
  return WishImage;
};
