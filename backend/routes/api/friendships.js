const express = require('express');
const asyncHandler = require('express-async-handler');
const { Relationship } = require('../../db/models');

const router = express.Router();

// Create friend request
router.post('/create', asyncHandler(async (req, res, next) => {
  const { actionUserId, receiverId } = req.body;

  let userOneId;
  let userTwoId;
  if (actionUserId < receiverId) {
    userOneId = actionUserId;
    userTwoId = receiverId;
  } else {
    userOneId = receiverId;
    userTwoId = actionUserId;
  }

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
