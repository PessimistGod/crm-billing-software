import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  imageName: {
    type: String,
    required: true,
  },
  productInfo: {
    type: String,
    required: true,
  },
  productOwner: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: false,
  },
  productName: {
    type: String,
    required: false,
  },
  vendorName: {
    type: String,
    required: false,
  },
  productActive: {
    type: String,
    required: false,
  },
  manufacturer: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  salesStartDate: {
    type: String,
    required: false,
  },
  salesEndDate: {
    type: String,
    required: false,
  },
  supportStartDate: {
    type: String,
    required: false,
  },
  supportEndDate: {
    type: String,
    required: false,
  },
  unitPrice: {
    type: String,
    required: false,
  },
  tax: {
    type: String,
    required: false,
  },
  taxable: {
    type: String,
    required: false,
  },
  qty: {
    type: String,
    required: false,
  },
  unit: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  }
}, { timestamps: true });

mongoose.models = {}
const ProductList = mongoose.model('ProductList', productSchema);

export default ProductList;
