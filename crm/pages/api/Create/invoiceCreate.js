import connectDB from '@/Middleware/db';
import Invoice from '@/Models/createInvoice';
connectDB()
export default async function saleCreate(req, res) {
  try {
    if (req.method === 'POST') {
      const invoice = new Invoice(req.body);

      const requiredFields = [{ key: 'invoiceOwner', message: 'Invoice Owner field is required' } , { key: 'salesOrder', message: 'Sales Order field is required' }];
      for (const field of requiredFields) {
        if (!invoice[field.key]) {
          return res.status(400).json({ error: field.message });
        }
      }
      await invoice.save();
      res.status(201).json({ success: 'Invoice created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

