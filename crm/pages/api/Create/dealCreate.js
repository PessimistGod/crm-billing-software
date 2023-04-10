import connectDB from '@/Middleware/db';
import Deal from '@/Models/createDeal';
connectDB()
export default async function dealCreate(req, res) {
  try {
    if (req.method === 'POST') {
      const deal = new Deal(req.body);

      // Check for required fields
      const requiredFields = [ { key: 'dealOwner', message: 'Deal Owner field is required' } , { key: 'dealName', message: 'Deal Name field is required' } ];
      for (const field of requiredFields) {
        if (!deal[field.key]) {
          return res.status(400).json({ error: field.message });
        }
      }
      await deal.save();
      res.status(201).json({ success: 'Deal created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

