import connectDB from '@/Middleware/db';
import Purchase from '@/Models/createPurchase';
connectDB()
export default async function saleCreate(req, res) {
  try {
    if (req.method === 'POST') {
      const purchase = new Purchase(req.body);

      const requiredFields = [{ key: 'purchaseOwner', message: 'Purchase Owner field is required' } , { key: 'vendorName', message: 'Vendor Name field is required' }];
      for (const field of requiredFields) {
        if (!purchase[field.key]) {
          return res.status(400).json({ error: field.message });
        }
      }
      await purchase.save();
      res.status(201).json({ success: 'Purchase Order created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

