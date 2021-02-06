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
}).fields([{ name: 'wishImage', maxCount: 5 }]);

const s3Upload = async (wishImageFile, folder) => {
  const { originalName, buffer } = await wishImageFile;
  const Key = `${folder}/${uuid()}${path.extname(originalName)}`;
  const uploadParams = {
    bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: 'public-read'
  };
  const result = await s3.upload(uploadParams).promise();
  return result.Location;
};

module.exports = {
  wishImageUpload,
  s3Upload
};
