import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  leadOwner: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
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
    required: true,
  },
  revenue: {
    type: String,
    required: false,
  },
  address: {
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
  }
}, { timestamps: true });

mongoose.models = {}
const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
