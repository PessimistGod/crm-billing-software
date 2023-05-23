import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ProductList from '@/Models/createProduct';
import connectDB from '@/Middleware/db';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { HiMinus } from 'react-icons/hi'


const DisplayAccount = ({ products }) => {
  console.log(products)

  const router = useRouter()
  const [registration, setRegistration] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const decodedToken = jwt_decode(token);
        setRegistration(decodedToken.id);
      } else {
        router.push('/Authenticate/Login');
      }
    } catch (error) {
      console.error(error);
      router.push('/Authenticate/Login');
    }
  }, []);
    const myLoader=({src, item})=>{
        return `/${products[item].imageName}`;
      }
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Product Code</th>
                <th className="px-4 -py-3">Unit Price </th>
                <th className="px-4 py-3">Quantity In Stock</th>
                <th className="px-4 py-3">Vendor Name</th>
                <th className="px-4 py-3">Product Owner</th>

              </tr>
            </thead>
            <tbody className="bg-white">
              {products &&
                Object.keys(products).filter((product) => (products[product].author === registration)).map((item) => (
                  <tr key={products[item]._id} className="text-gray-700">
                    <td className="px-4 py-3 text-sm border">{products[item].productName?products[item].productName:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{products[item].productCode?products[item].productCode:<HiMinus size={16}/>}</td>

                    <td className="px-4 py-3 text-sm border">{products[item].unitPrice?products[item].unitPrice:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{products[item].qty?products[item].qty:<HiMinus size={16}/>}</td>


              
                    <td className="px-4 py-3 text-sm border">{products[item].vendorName?products[item].vendorName:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{products[item].productOwner?products[item].productOwner:<HiMinus size={16}/>}</td> 


                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DisplayAccount;

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const products = await ProductList.find({}, { updatedAt: 0 }).lean();

    return {
      props: {
        products: products.map((product) => ({
          ...product,
          _id: (product._id) ? ((JSON.stringify(product._id)).slice(1,-1)) : '',
          author: (product.author) ? ((JSON.stringify(product.author)).slice(1,-1)) : '',
          createdAt: product.createdAt.toISOString(),
        })),
      },
    };
  } 
  catch (error) {
    console.log(error);
    return {
      props: { products: [] },
    };
  }
}
