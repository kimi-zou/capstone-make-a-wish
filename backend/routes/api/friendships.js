const express = require('express');
const asyncHandler = require('express-async-handler');
const { Relationship } = require('../../db/models');

const router = express.Router();

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

module.exports = router;
