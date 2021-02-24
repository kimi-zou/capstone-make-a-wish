const AWS = require('aws-sdk');
const multer = require('multer');
const uuid = require('uuid').v4;
const path = require('path');

const NAME_OF_BUCKET = 'makeawish';
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

// ---------------------------------------------------
const storage = multer.memoryStorage();
const wishImageUpload = multer({
  storage,
  limits: { fileSize: '5mb' }
}).fields([{ name: 'files', maxCount: 4 }]);

const avatarUpload = multer({
  storage,
  limits: { fileSize: '5mb' }
}).single('avatar');

const s3Upload = async (file, folder) => {
  const { originalname, buffer } = await file;
  const Key = `${folder}/${uuid()}${path.extname(originalname)}`;
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: 'public-read'
  };
  const result = await s3.upload(uploadParams).promise();
  return result.Location;
};

module.exports = {
  avatarUpload,
  wishImageUpload,
  s3Upload
};
