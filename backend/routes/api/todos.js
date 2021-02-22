const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  TodoWish
} = require('../../db/models');

const router = express.Router();

// Update todo status
router.patch(
  '/:id(\\d+)/update',
  asyncHandler(async (req, res, next) => {
    const todo = await TodoWish.updateEntry(req.params.id, req.body.status);
    return res.json({ todo });
  }));

module.exports = router;
