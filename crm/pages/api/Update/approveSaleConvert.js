import connectDB from '@/Middleware/db';
import Sales from '@/Models/createSales';

export default async function handler(req, res) {
  connectDB();

  if (req.method === 'PUT') {
    try {
      const { id,value } = req.query; 
      if (!id) {
        res.status(400).json({ success: false, error: 'Missing ID' });
        return;
      }

      const sales = await Sales.findOneAndUpdate({ _id: id }, { converted: true, template: value });
      if (!sales) {
        res.status(404).json({ success: false, error: 'Sales not found' });
        return;
      }

      res.status(200).json({ success: true, sales });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
