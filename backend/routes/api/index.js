const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const wishesRouter = require('./wishes');
const searchRouter = require('./search');
const friendshipRouter = require('./friendships');
const notificationRouter = require('./notifications');
const todoRouter = require('./todos');

// GET /api/set-token-cookie
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get(
  '/set-token-cookie',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
router.get('/restore-user', restoreUser, (req, res) => {
  return res.json(req.user);
});

// // GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/wishes', wishesRouter);
router.use('/search', searchRouter);
router.use('/friendships', friendshipRouter);
router.use('/notifications', notificationRouter);
router.use('/todos', todoRouter);

module.exports = router;
