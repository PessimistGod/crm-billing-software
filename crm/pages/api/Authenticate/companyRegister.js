import connectDB from "@/Middleware/db";
import Company from "@/Models/createCompany";

connectDB();


export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {

      try {
        {
          const companyDetails = new Company(req.body);

          // Check for required fields
          const requiredFields = [
            { key: 'ownerName', message: 'User Name field is required' },
            { key: 'companyName', message: 'Company field is required' },
            { key: 'companyStreet', message: 'Street field is required' },
            { key: 'companyCity', message: 'City field is required' },
            { key: 'companyState', message: 'State field is required' },
            { key: 'companyZipcode', message: 'Pincode field is required' },
            { key: 'companyCountry', message: 'Country field is required' },
          ];
          for (const field of requiredFields) {
            if (!companyDetails[field.key]) {
              return res.status(400).json({ error: field.message });
            }
          }
          const companyExists = await Company.findOne({ companyName: companyDetails.companyName });
          if (companyExists) {
            return res.status(400).json({ error: 'Company Name already exists' });
          }

          const gstinRegex = /^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})$/;
          if (!gstinRegex.test(companyDetails.gstin) && companyDetails.gstin) {
            return res.status(400).json({ error: 'Please enter a valid GSTIN' });
          }

          await companyDetails.save();
          res.status(201).json({ success: 'Company Details Created Successfully' });
        }
      }
      catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
      }
    }


  } catch (error) {
    console.log(error)
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

}


