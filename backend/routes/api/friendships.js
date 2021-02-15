const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  Relationship,
  NotificationObject,
  NotificationActor,
  NotificationReceiver,
  User,
  sequelize
} = require('../../db/models');
const socketapi = require('../../socketapi');

const router = express.Router();

// Create friend request
router.post('/create', asyncHandler(async (req, res, next) => {
  try {
    await sequelize.transaction(async (t) => {
      // ---create new friend relationship
      const { actionUserId, receiverId } = req.body;
      const userOneId = actionUserId < receiverId ? actionUserId : receiverId;
      const userTwoId = actionUserId > receiverId ? actionUserId : receiverId;
      const relationship = await Relationship.create({
        userOneId,
        userTwoId,
        actionUserId,
        status: 0
      });
      // ---get action user information
      const actionUser = await User.findByPk(actionUserId);
      // ---create friend request notification
      const notification = await NotificationObject.create({
        entityTypeId: 1,
        entityId: relationship.id
      });
      await NotificationActor.create({
        notificationObjectId: notification.id,
        actorId: actionUserId,
        status: 0
      });
      const notificationReceiver = await NotificationReceiver.create({
        notificationObjectId: notification.id,
        receiverId: receiverId,
        actorId: actionUserId,
        status: 0
      });
      // ---broadcast friend request notification
      socketapi.io.emit('receive friend request', {
        notificationReceiver,
        actionUser,
        relationship
      });
      return res.json({ relationship });
    });
  } catch (err) {
    return res.json({ err });
  }
}));

// Update friend request
router.patch('/:id(\\d+)/update', asyncHandler(async (req, res, next) => {
  const { actionUserId, status } = req.body;
  const relationship = await Relationship.findOne({
    where: { id: req.params.id }
  });
  relationship.actionUserId = actionUserId;
  relationship.status = status;
  await relationship.save();
  return res.json({ relationship });
}));

// Delete friend request
router.delete('/:id(\\d+)/delete', asyncHandler(async (req, res, next) => {
  const relationship = await Relationship.findOne({
    where: { id: req.params.id }
  });
  await relationship.destroy();
  return res.json({ message: 'Successfully cancel friend request' });
}));

// Get single friend relationship data
router.get('/lookup/:userOneId(\\d+)/:userTwoId(\\d+)', asyncHandler(async (req, res, next) => {
  const { userOneId, userTwoId } = req.params;
  const relationship = await Relationship.findOne({
    where: {
      userOneId,
      userTwoId
    }
  });
  return res.json({ relationship });
}));

// Get single friend relationship by id
router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const relationship = await Relationship.findOne({
    where: { id: req.params.id }
  });
  return res.json({ relationship });
}));

module.exports = router;
