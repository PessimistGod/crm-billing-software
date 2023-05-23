import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup',
    required: true,
  }
});


mongoose.models = {}
const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
