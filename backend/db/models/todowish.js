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

  // Create new todo entry
  TodoWish.createNew = async function (wishId, claimedUserId) {
    const todo = await TodoWish.create({
      wishId,
      claimedUserId
    });
    return await TodoWish.findByPk(todo.id);
  };

  // Update todo entry
  TodoWish.updateEntry = async function (todoId, status) {
    const todo = await TodoWish.findByPk(todoId);
    todo.status = status;
    return await todo.save();
  };

  return TodoWish;
};
