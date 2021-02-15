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

// 1. Create friend request
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
      const notification = await NotificationObject.createNewNotification(
        1,
        relationship.id
      );
      await NotificationActor.createNew(
        notification.id,
        actionUserId,
        0
      );
      const notificationReceiver = NotificationReceiver.createNew(
        notification.id,
        receiverId,
        actionUserId,
        0
      );

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

// 2. Update friend request
router.patch('/:id(\\d+)/update', asyncHandler(async (req, res, next) => {
  // ---update friend relationship
  const { actionUserId, status } = req.body;
  const relationship = await Relationship.findOne({
    where: { id: req.params.id }
  });
  relationship.actionUserId = actionUserId;
  relationship.status = status;
  await relationship.save();

  // ---get action user information
  const actionUser = await User.findByPk(actionUserId);

  // ---create friend accept notification
  const notification = await NotificationObject.createNewNotification(
    2,
    relationship.id
  );
  await NotificationActor.createNew(
    notification.id,
    actionUserId,
    0
  );
  const userSentRequestId = (
    relationship.userOneId === actionUserId
      ? relationship.userTwoId
      : relationship.userOneId
  );
  const notificationReceiver = NotificationReceiver.createNew(
    notification.id,
    userSentRequestId,
    actionUserId,
    0
  );

  // ---broadcast friend accept notification
  if (relationship.status === 1) {
    socketapi.io.emit('accept friend request', {
      notificationReceiver,
      actionUser,
      relationship
    });
  }
  return res.json({ relationship });
}));

// 3. Delete friend request
router.delete('/:id(\\d+)/delete', asyncHandler(async (req, res, next) => {
  const relationship = await Relationship.findOne({
    where: { id: req.params.id }
  });
  await relationship.destroy();
  return res.json({ message: 'Successfully cancel friend request' });
}));

// 4. Get single friend relationship data
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

// 5. Get single friend relationship by id
router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const relationship = await Relationship.findOne({
    where: { id: req.params.id }
  });
  return res.json({ relationship });
}));

module.exports = router;
