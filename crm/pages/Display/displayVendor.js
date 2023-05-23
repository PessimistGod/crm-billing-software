import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Vendor from '@/Models/createVendor';
import connectDB from '@/Middleware/db';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { HiMinus } from 'react-icons/hi';

const DisplayVendor = ({ vendors }) => {
  const [registration, setRegistration] = useState('');
  const router = useRouter()


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
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Vendor Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Website</th>
                <th className="px-4 py-3">Vendor Owner</th>


              </tr>
            </thead>
            <tbody className="bg-white">
              {vendors &&
                Object.keys(vendors).filter((vendor) => (vendors[vendor].author === registration)).map((item) => (
                  <tr key={vendors[item]._id} className="text-gray-700">
                    <td className="px-4 py-3 text-sm border">{vendors[item].vendorName?vendors[item].vendorName:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{vendors[item].email?vendors[item].email:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{vendors[item].phone?vendors[item].phone:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{vendors[item].website?vendors[item].website:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{vendors[item].vendorOwner?vendors[item].vendorOwner:<HiMinus size={16}/>}</td> 

                
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DisplayVendor;

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const vendors = await Vendor.find({}, { _id: 0, updatedAt: 0 }).lean();

    return {
      props: {
        vendors: vendors.map((vendor) => ({
          ...vendor,
          author: (vendor.author) ? ((JSON.stringify(vendor.author)).slice(1,-1)) : '',
          createdAt: vendor.createdAt.toISOString(),
        })),
    },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { vendors: [] },
    };
  }
}
