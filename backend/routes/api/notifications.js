const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  NotificationReceiver
} = require('../../db/models');

const router = express.Router();

// Update notification status
router.patch('/:id(\\d+)/update', asyncHandler(async (req, res, next) => {
  const notification = await NotificationReceiver.findByPk(req.params.id);
  notification.status = 1;
  notification.save();
  return res.json({ notification });
}));

module.exports = router;
