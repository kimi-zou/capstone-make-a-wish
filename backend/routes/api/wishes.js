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
      if (files) return files.length > 0 && files.length < 4;
    })
    .withMessage('Please provide at least one wish image.'),
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

module.exports = router;
