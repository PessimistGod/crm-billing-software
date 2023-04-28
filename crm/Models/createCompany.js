import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  gstin:{
    type: String,
    required: false,
  },
  companyStreet:{
    type: String,
    required: true,
  },
  companyCity:{
    type:String,
    required:true,
  },
  companyState:{
    type: String,
    required:true,
  },
  companyZipcode:{
    type: String,
    required:true,
  },
  companyCountry: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
    required: false,
  },
}, { timestamps: true });

mongoose.models = {}
const Company = mongoose.model('Company', companySchema);
export default Company;
