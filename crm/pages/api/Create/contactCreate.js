import connectDB from '@/Middleware/db';
import Contact from '@/Models/createContact';
connectDB()
export default async function contactCreate(req, res) {
    try {
        if (req.method === 'POST') {
            const contact = new Contact(req.body);

            // Check for required fields
            const requiredFields = [{ key: 'contactOwner', message: 'Contact Owner field is required' }, { key: 'companyName', message: 'Company Name field is required' }];
            for (const field of requiredFields) {
                if (!contact[field.key]) {
                    return res.status(400).json({ error: field.message });
                }
            }
            await contact.save();
            res.status(201).json({ success: 'Contact created successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

