import connectDB from '@/Middleware/db';
import Sales from '@/Models/createSales';
connectDB()
export default async function saleCreate(req, res) {
  try {
    if (req.method === 'POST') {
      const sale = new Sales(req.body);

      const requiredFields = [{ key: 'salesOwner', message: 'Sales Owner field is required' } , { key: 'dealName', message: 'Deal Name field is required' }];
      for (const field of requiredFields) {
        if (!sale[field.key]) {
          return res.status(400).json({ error: field.message });
        }
      }
      
      await sale.save();
      res.status(201).json({ success: 'Sale created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

