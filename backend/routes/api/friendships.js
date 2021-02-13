const express = require('express');
const asyncHandler = require('express-async-handler');
const { Relationship } = require('../../db/models');

const router = express.Router();

// Create friend request
router.post('/create', asyncHandler(async (req, res, next) => {
  const { actionUserId, receiverId } = req.body;
  const userOneId = actionUserId < receiverId ? actionUserId : receiverId;
  const userTwoId = actionUserId > receiverId ? actionUserId : receiverId;
  const relationship = await Relationship.create({
    userOneId,
    userTwoId,
    actionUserId,
    status: 0
  });
  return res.json({ relationship });
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

module.exports = router;
