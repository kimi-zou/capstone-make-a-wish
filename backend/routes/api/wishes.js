const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { wishImageUpload, s3Upload } = require('../../awsS3');
const { Wish, WishImage, sequelize } = require('../../db/models');

const router = express.Router();

// -------------- Validators ----------------
const validateWishForm = [
  check('title')
    .notEmpty()
    .withMessage('Please provide a wish title.'),
  check('link')
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage('Please provide a valid url link.'),
  check('files')
    .custom((value, { req }) => {
      const { files } = req.files;
      if (files) return files.length > 0 && files.length < 5;
    })
    .withMessage('Please provide 1-4 wish image.'),
  handleValidationErrors
];

// -------------- Routes ----------------
// 1. Create a Wish
router.post('/create', requireAuth, restoreUser, wishImageUpload, validateWishForm,
  asyncHandler(async (req, res, next) => {
    const { title, description, link, quantity } = req.body;
    const { files } = req.files;
    const userId = req.user.id;

    try {
      const result = await sequelize.transaction(async (t) => {
        const wish = await Wish.createWish({
          title,
          description,
          link,
          quantity,
          userId
        }, { transaction: t });
        const wishId = wish.id;

        const wishImages = await Promise.all(files.map(async (file) => {
          const image = await s3Upload(file, 'wishImages');
          WishImage.createWishImage({ image, wishId }, { transaction: t });
          return image;
        }));

        return { wish, wishImages };
      });
      const { wish, wishIamges } = result;
      return res.json({ wish, wishIamges });
    } catch (err) {
      return next(err);
    }
  }));

// 2. Get a wish by id
router.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const wish = await Wish.getWishById(req.params.id, WishImage);
  return res.json({ wish });
}));

// 3. Delete a wish
router.delete('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  await Wish.deleteWish(req.params.id);
  return res.json({ message: 'The wish was deleted.' });
}));

// 4. Make a wish public
router.patch('/:id(\\d+)/update/public', asyncHandler(async (req, res, next) => {
  const wish = await Wish.updateWish(req.params.id, 1);
  return res.json({ wish });
}));

// 5. Make a wish private
router.patch('/:id(\\d+)/update/private', asyncHandler(async (req, res, next) => {
  const wish = await Wish.updateWish(req.params.id, 0);
  return res.json({ wish });
}));

// 6. Lock a wish
router.patch('/:id(\\d+)/update/lock', asyncHandler(async (req, res, next) => {
  const wish = await Wish.updateWish(req.params.id, 2);
  return res.json({ wish });
}));

module.exports = router;
