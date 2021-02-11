const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Wish, WishImage, Relationship, sequelize } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, birthday } = req.body;
    let user;
    if (birthday) {
      user = await User.signup({ email, username, password, birthday });
    } else {
      user = await User.signupNoBirthday({ email, username, password });
    }
    await setTokenCookie(res, user);
    return res.json({ user });
  })
);

// Wishes lookup
router.get('/:id(\\d+)/wishes/public', asyncHandler(async (req, res) => {
  const wishes = await Wish.getPublicWishesByUserId(req.params.id, WishImage);
  return res.json({ wishes });
}));

router.get('/:id(\\d+)/wishes/private', asyncHandler(async (req, res) => {
  const wishes = await Wish.getPrivateWishesByUserId(req.params.id, WishImage);
  return res.json({ wishes });
}));

// Friends lookup
router.get(
  '/:id(\\d+)/friends',
  restoreUser,
  asyncHandler(async (req, res) => {
    // console.log(req.user);
    const userId = req.params.id;
    const friends = await Relationship.findAll({
      // include: {
      //   model: Relationship,
      where: {
        status: 1,
        [Op.or]: [
          { userOneId: userId },
          { userTwoId: userId }
        ]
      }
      // }
    });

    const users = friends.map(friend => {
      if (friend.userOneId === userId) {
        return friend.userOneId;
      }
      return friend.userTwoId;
    });

    const result = await User.findAll({
      where: {
        id: {
          [Op.in]: users
        }
      }
    });

    return res.json({ result });
  }));

module.exports = router;
