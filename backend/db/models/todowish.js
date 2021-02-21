'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoWish = sequelize.define('TodoWish', {
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});

  TodoWish.associate = function (models) {
    TodoWish.belongsTo(models.User, {
      foreignKey: 'claimedUserId'
    });
    TodoWish.belongsTo(models.Wish, {
      foreignKey: 'wishId'
    });
  };

  TodoWish.createNew = async function (wishId, claimedUserId) {
    const todo = await TodoWish.create({
      wishId,
      claimedUserId
    });
    return await TodoWish.findByPk(todo.id);
  };

  return TodoWish;
};
