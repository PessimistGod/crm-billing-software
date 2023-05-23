import connectDB from '@/Middleware/db';
import Product from '@/Models/createProduct';

 connectDB();
export default async function handler(req, res) {
    if (req.method === 'GET') {

  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
}
}

