const express = require('express');
const asyncHandler = require('express-async-handler');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { wishImageUpload, s3Upload } = require('../../awsS3');
const { Wish, WishImage, sequelize } = require('../../db/models');

const router = express.Router();

// -------------- Routes ----------------
// 1. Create a Wish
router.post('/create', requireAuth, restoreUser, wishImageUpload,
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
