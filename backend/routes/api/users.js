const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { getRandomImages, avatars } = require('../../utils/random-seed-image');
const { avatarUpload, s3Upload } = require('../../awsS3');
const {
  User,
  Wish,
  WishImage,
  Relationship,
  NotificationReceiver,
  NotificationObject,
  TodoWish
} = require('../../db/models');

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

const validateUpdate = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('displayName')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a display name with at least 4 characters.'),
  check('displayName').not().isEmail().withMessage('Display name cannot be an email.'),
  check('password')
    .custom(value => {
      if (value) {
        if (value.length < 7) {
          throw new Error('Password must be 6 characters or more.');
        }
      } else {
        return true;
      }
    }),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, birthday } = req.body;
    const avatar = getRandomImages(avatars);
    let user;
    if (birthday) {
      user = await User.signup({ email, username, password, birthday, avatar });
    } else {
      user = await User.signupNoBirthday({ email, username, password, avatar });
    }
    await setTokenCookie(res, user);
    return res.json({ user });
  })
);

// Update user info
router.patch(
  '/:id(\\d+)',
  avatarUpload,
  validateUpdate,
  asyncHandler(async (req, res, next) => {
    const { email, password, displayName, birthday } = req.body;
    const avatar = req.file;
    const userId = req.params.id;
    if (avatar) {
      const avatarUrl = await s3Upload(avatar, 'avatar');
      const user = await User.updateInfo({ userId, displayName, email, password, birthday, avatarUrl });
      if (!user) next();
      return res.json({ user });
    } else {
      const avatarUrl = '';
      const user = await User.updateInfo({ userId, displayName, email, password, birthday, avatarUrl });
      if (!user) next();
      return res.json({ user });
    }
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
    const userId = req.params.id;
    const friends = await Relationship.friendshipLookup(userId);
    const users = await User.friendsLookup(friends, userId);
    return res.json({ users });
  }));

// Friends lookup by group
router.get(
  '/:id(\\d+)/friends/group',
  restoreUser,
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const friends = await Relationship.friendshipLookup(userId);
    const users = await User.friendsLookupGroup(friends, userId);
    return res.json({ users });
  })
);

// Pending Friends lookup
router.get(
  '/:id(\\d+)/pending-friends',
  restoreUser,
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const friends = await Relationship.findAll({
      where: {
        status: { [Op.or]: [0, 2] },
        [Op.or]: [
          { userOneId: userId },
          { userTwoId: userId }
        ]
      }
    });
    const users = await Promise.all(friends.map(async friend => {
      if (friend.userOneId === parseInt(userId)) {
        return await User.findByPk(friend.userTwoId);
      } else {
        return await User.findByPk(friend.userOneId);
      }
    }));
    return res.json({ users });
  }));

// Notifications lookup
router.get(
  '/:id(\\d+)/notifications',
  asyncHandler(async (req, res, next) => {
    const notifications = await NotificationReceiver.findAll({
      where: {
        receiverId: req.params.id
      },
      include: [
        { model: NotificationObject },
        {
          model: User
        }
      ],
      order: [
        ['status', 'ASC'],
        ['createdAt', 'DESC']
      ]
    });
    return res.json({ notifications });
  })
);

// Todo Lookup
router.get(
  '/:id(\\d+)/todos',
  asyncHandler(async (req, res, next) => {
    const todos = await TodoWish.findAll({
      where: {
        claimedUserId: req.params.id
      },
      include: [{
        model: Wish,
        include: [WishImage, User]
      }]
    });
    return res.json({ todos });
  })
);

module.exports = router;
