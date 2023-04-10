import connectDB from '@/Middleware/db';
import Lead from '@/Models/createLead';
connectDB()
export default async function leadCreate(req, res) {
  try {
    if (req.method === 'POST') {
      const lead = new Lead(req.body);

      // Check for required fields
      const requiredFields = [{ key: 'imageName', message: 'Image URL field is required' } , { key: 'leadOwner', message: 'Lead Owner field is required' } , { key: 'company', message: 'Company Name field is required' } , { key: 'leadStatus', message: 'Lead Status field is required' }];
      for (const field of requiredFields) {
        if (!lead[field.key]) {
          return res.status(400).json({ error: field.message });
        }
      }
      await lead.save();
      res.status(201).json({ success: 'Lead created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

