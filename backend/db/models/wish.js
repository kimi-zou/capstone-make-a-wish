'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wish = sequelize.define('Wish', {
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { 
      type: DataTypes.TEXT,
      allowNull: true,
    },
    link: { 
      type: DataTypes.TEXT,
      allowNull: true,
    },
    quantity: { 
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});

  Wish.associate = function(models) {
    Wish.hasMany(models.WishImage, {
      foreignKey: "wishId" 
    }),
    Wish.belongsTo(models.User, {
      as: "userId"
    })
  };

  return Wish;
};