const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { wishImageUpload, s3Upload } = require('../../awsS3');
const { handleValidationErrors } = require('../../utils/validation');
const { Wish } = require('../../db/models');

const router = express.Router();

// -------------- Routes ----------------
// 1. Create a Wish
router.post(
  '/create',
  requireAuth,
  restoreUser,
  wishImageUpload,
  asyncHandler(async (req, res, next) => {
    const { title, description, link, quantity } = req.body;
    const images = await s3Upload(req.files.wishImage, 'wishImages');
    console.log(images);
    console.log(req.user);
  }));

module.exports = router;
