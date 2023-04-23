import connectDB from '@/Middleware/db';
import Vendor from '@/Models/createVendor';
connectDB()
export default async function leadCreate(req, res) {
  try {
    if (req.method === 'POST') {
      const vendor = new Vendor(req.body);

      const requiredFields = [{ key: 'imageName', message: 'Image URL field is required' } , { key: 'vendorOwner', message: 'Vendor Owner field is required' } , { key: 'vendorName', message: 'Vendor Name field is required' }];
      for (const field of requiredFields) {
        if (!vendor[field.key]) {
          return res.status(400).json({ error: field.message });
        }
      }
      await vendor.save();
      res.status(201).json({ success: 'Vendor created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

