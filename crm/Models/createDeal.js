import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  dealOwner: {
    type: String,
    required: false,
  },
  dealName: {
    type: String,
    required: false,
  },
  amount: {
    type: String,
    required: false,
  },
  closingDate: {
    type: String,
    required: false,
  },
  accountName: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  expectedRevenue: {
    type: String,
    required: false,
  },
  leadSource: {
    type: String,
    required: false,
  },
  campaignSource: {
    type: String,
    required: false,
  },
  contactName: {
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
const Deal = mongoose.model('Deal', dealSchema);

export default Deal;
