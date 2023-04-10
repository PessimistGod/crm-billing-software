import connectDB from '@/Middleware/db';
import Account from '@/Models/createAccount';
connectDB()
export default async function accountCreate(req, res) {
    try {
        if (req.method === 'POST') {
            const account = new Account(req.body);

            // Check for required fields
            const requiredFields = [{ key: 'imageName', message: 'Image URL field is required' }, { key: 'accountOwner', message: 'Account Owner field is required' }, { key: 'accountName', message: 'Account Name field is required' }, { key: 'ownership', message: 'Ownership field is required' }];
            for (const field of requiredFields) {
                if (!account[field.key]) {
                    return res.status(400).json({ error: field.message });
                }
            }
            await account.save();
            res.status(201).json({ success: 'Account created successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

