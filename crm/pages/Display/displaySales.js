import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Sales  from '@/Models/createSales';
import connectDB from '@/Middleware/db';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';


const DisplayAccount = ({ sales }) => {
    console.log(sales);


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
        return `/${sales[item].imageName}`;
      }
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Account Owner</th>
                <th className="px-4 py-3">Account Name</th>
                <th className="px-4 py-3">Ownership</th>
                <th className="px-4 -py-3">Annual Revenue</th>
                <th className="px-4 py-3">Parent Account</th>
                <th className="px-4 py-3">View</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sales &&
                Object.keys(sales).filter((sale) => (sales[sale].author === registration)).map((item) => (
                  <tr key={sales[item]._id} className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                             <Image
                             width={300}
                             height={300}
                             className="object-cover w-full h-full rounded-full"
                             src={myLoader({ item })}
                             alt="Logo"
                             />
                            
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">{sales[item].accountOwner}</p>
                          <p className="text-xs text-gray-600"></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{sales[item].ownership}</td>
                    <td className="px-4 py-3 text-md border">
                      <span className="px-2 py-1 font-semibold accounting-tight text-green-700 rounded-sm">
                        {' '}
                        {sales[item].ownership}{' '}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">{sales[item].revenue}</td>
                    <td className="px-4 py-3 text-sm border">{sales[item].parentAccount}</td> 

                    <td className=" py-2 text-ms font-semibold border"><button className='bg-blue-500 mx-auto px-5 py-3 border rounded-3xl'>View</button></td>
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

    const sales = await Sales.find({}, { updatedAt: 0 }).lean();

    return {
        props: {
          sales: sales.map((sale) => ({
            ...sale,
            rows: sale.rows.map((item)=>({
                ...item,
                _id: String(item._id),
            })),
            _id: sale._id ? String(sale._id) : '',
           
            author: sale.author ? String(sale.author) : '',
            createdAt: sale.createdAt.toISOString(),
      
          })),
        },
      };
      
      
  } 
  catch (error) {
    console.log(error);
    return {
      props: { sales: [] },
    };
  }
}
