// api/getSalesData.js

import connectDB from '@/Middleware/db';
import Sales from '@/Models/createSales';

// Connect to the database
connectDB();

// Define the API route handler
export default async function getSalesData(req, res) {
  try {
    // Extract the id from the request query parameters
    const { id } = req.query;

    // Retrieve sales data from the database using the id
    const salesData = await Sales.findOne({ _id: id });

    // If no sales data is found, return an appropriate response
    if (!salesData) {
      return res.status(404).json({ error: 'Sales data not found' });
    }

    // If sales data is found, return it in the response
    res.status(200).json({ salesData });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
