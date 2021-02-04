const AWS = require("aws-sdk");
const multer = require("multer");
const path = require("path");

const NAME_OF_BUCKET = "makeawish";
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// ---------------------------------------------------
const storage = multer.memoryStorage();
