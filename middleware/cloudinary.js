const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'jewellery-products',
      format: file.mimetype.split("/")[1],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  },
});

const upload = multer({ storage});

module.exports = upload;
