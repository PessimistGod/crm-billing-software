import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    imageName: {
        type: String,
        required: true,
    },
    accountOwner: {
        type: String,
        required: true,
    },
    accountName: {
        type: String,
        required: true,
    },
    accountSite: {
        type: String,
        required: false,
    },
    parentAccount: {
        type: String,
        required: false,
    },
    accountNumber: {
        type: String,
        required: false,
    },
    revenue: {
        type: String,
        required: false,
    },
    ownership: {
        type: String,
        required: true,
    },
    employee: {
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
      },
}, { timestamps: true });

mongoose.models = {}
const Account = mongoose.model('Account', accountSchema);

export default Account;
