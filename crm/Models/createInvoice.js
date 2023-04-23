import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  invoiceOwner: {
    type: String,
    required: true,
  },
  salesOrder: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  purchaseOrder: {
    type: String,
    required: false,
  },
  customerNumber: {
    type: String,
    required: false,
  },
  invoiceDate:{
    type: String,
    required: false,
  },
  dueDate: {
    type: String,
    required: false,
  },
  
  contactName: {
    type: String,
    required: false,
  },
  salesCommission: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  accName: {
    type: String,
    required: false,
  },
  billingStreet: {
    type: String,
    required: false,
  },
  shippingStreet: {
    type: String,
    required: false,
  },
  billingCity: {
    type: String,
    required: false,
  },
  billingState: {
    type: String,
    required: false,
  },
  billingCode: {
    type: String,
    required: false,
  },
  billingCountry: {
    type: String,
    required: false,
  },
  shippingCity: {
    type: String,
    required: false,
  },
  shippingState: {
    type: String,
    required: false,
  },
  shippingCode:{
    type: String,
    required: false,
  },
  shippingCountry:{
    type: String,
    required: false,
  },
  rows: {
    type: [
      {
        sn: {
          type: String,
          required: false
        },
        prodName: {
          type: String,
          required: false
        },
        qty: {
          type: String,
          required: false
        },
        price: {
          type: String,
          required: false
        },
        amount: {
          type: String,
          required: false
        },
        discount: {
          type: String,
          required: false
        },
        tax: {
          type: String,
          required: false
        },
        total: {
          type: String,
          required: false
        }
      }
    ],
},
subTotal:{
    type: String,
    required: false,
  },
  totalDiscount:{
    type: String,
    required: false,
  },
  totalTax:{
    type: String,
    required: false,
  },
  grandTotal:{
    type: String,
    required: false,
  }
}, { timestamps: true });

mongoose.models = {}
const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
