import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: false,
  },
  file_path: {
    type: String,
    required: false,
  },
  file_mimetype: {
    type: String,
    required: false,
  },
  leadOwner: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  salutation: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  industry: {
    type: String,
    required: false,
  },
  leadSource: {
    type: String,
    required: false,
  },
  leadStatus: {
    type: String,
    required: false,
  },
  revenue: {
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup',
    required: true,
  }
}, { timestamps: true });

mongoose.models = {}
const Lead = mongoose.model('Lead', leadSchema);
export default Lead; 