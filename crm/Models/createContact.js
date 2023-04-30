import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    imageName: {
        type: String,
        required: true,
    },
    contactOwner: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    vendorName: {
        type: String,
        required: false,
    },
    jobTitle: {
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
    leadSource: {
        type: String,
        required: false,
    },
    DOB: {
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
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
