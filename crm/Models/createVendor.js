import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: false,
  },
  vendorOwner: {
    type: String,
    required: false,
  },
  vendorName: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  account: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  zipcode: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup',
    required: true,
  }
}, { timestamps: true });

mongoose.models = {}
const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
