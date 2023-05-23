import connectDB from '@/Middleware/db';
import ProductList from '@/Models/createProduct';
connectDB()
export default async function productListCreate(req, res) {
  try {
    if (req.method === 'POST') {
      const productList = new ProductList(req.body);

      const requiredFields = [{ key: 'productOwner', message: 'Product Owner field is required' } , { key: 'productName', message: 'Product Name field is required' }];
      for (const field of requiredFields) {
        if (!productList[field.key]) {
          return res.status(400).json({ error: field.message });
        }
      }
      await productList.save();
      res.status(201).json({ success: 'Product created successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

