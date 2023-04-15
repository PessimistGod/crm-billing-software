const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  isAdmin:{
    type: Boolean,
    default: false
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  otpCode: {
      type: String,
      required: false
    },
  });


mongoose.models = {}
const Signup = mongoose.model('Signup', signupSchema);
module.exports = Signup;
