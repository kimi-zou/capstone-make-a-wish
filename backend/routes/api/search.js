const express = require('express');
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
const { Op } = require('sequelize');

const router = express.Router();

// -------------- Routes ----------------
router.get('/', asyncHandler(async (req, res, next) => {
  const query = req.query.user;
  const users = await User.findAll({
    where: {
      [Op.or]: [
        { displayName: { [Op.iLike]: `%${query}%` } },
        { username: { [Op.iLike]: `%${query}%` } }
      ]
    },
    order: [['username']],
    limit: 15
  });
  return res.json({ users });
}));

module.exports = router;
