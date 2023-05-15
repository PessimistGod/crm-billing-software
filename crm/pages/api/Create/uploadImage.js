import Image from '../../../Models/Image';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const cloudinary = require('cloudinary').v2;
import connectDB from '../../../Middleware/db';

connectDB();

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: 'diwkqz1st',
  api_key: '529378961737694',
  api_secret: '9YlyC5rrcktnNtrE2Z6SXqUUa9A',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'FinalYearProject',
    allowedFormats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage: storage });

export default async (req, res) => {
  try {
    upload.single('image')(req, res, async (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error uploading image' });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'No file provided' });
      }

      const result = await Image.create({ url: req.file.path });
      res.status(201).json({ message: 'Image uploaded successfully', result });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
 