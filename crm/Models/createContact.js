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
    contactSource: {
        type: String,
        required: false,
    },
    vendorName: {
        type: String,
        required: false,
    },
    jobTitle: {
        type: String,
        required: false,
    },

    contactStatus: {
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
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
