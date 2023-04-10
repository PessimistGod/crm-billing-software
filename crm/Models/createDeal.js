import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  dealOwner: {
    type: String,
    required: true,
  },
  dealName: {
    type: String,
    required: true,
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
  }
}, { timestamps: true });

mongoose.models = {}
const Deal = mongoose.model('Deal', dealSchema);

export default Deal;
