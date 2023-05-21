const path = require("path");
const multer = require("multer");
import Images from '@/Models/Image'
import connectDB from "@/Middleware/db";

const upload = multer({
  dest: "public/uploads/",
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 100000000, //1gb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png format."
        )
      );
    }
    cb(undefined, true);
  },
});

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      connectDB();
      await new Promise((resolve, reject) => {
        upload.single("image")(req, res, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
      });
      const { author } = req.body;
      const { path } = req.file;
      const file = new Images({
        author,
        url: path,
      });
      console.log(file);
      await file.save();
      res.send("Image uploaded successfully.");
    } catch (error) {
      res.status(400).send("Error while uploading Image. Try again later.");
      console.log(error);
    }
  } else {
    res.status(405).send("Method not allowed.");
  }
}