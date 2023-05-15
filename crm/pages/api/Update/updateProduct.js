
import connectDB from '@/Middleware/db';
import ProductList from '@/Models/createProduct';

export default async function handler(req, res) {
  const { method, query: { productId } } = req;
  
  await dbConnect();

  switch (method) {
    case 'POST':
      const { qty } = req.body;

      try {
        // Retrieve product from database by ID
        const product = await ProductList.findById(productId);

        // Update product quantity
        product.qty = qty;

        // Save updated product to database
        await product.save();

        res.status(200).json({ success: true, message: 'Product quantity updated successfully.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'An error occurred while updating product quantity.' });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
