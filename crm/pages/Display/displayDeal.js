import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Deal from '@/Models/createDeal';
import connectDB from '@/Middleware/db';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

const DisplayDeal = ({ deals }) => {
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
                <th className="px-4 py-3">Deal Owner</th>
                <th className="px-4 py-3">Deal Name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Business Type</th>
                <th className="px-4 py-3">Closing Date</th>
                <th className="px-4 py-3">View</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {deals &&
                Object.keys(deals).filter((deal) => (deals[deal].author === registration)).map((item) => (
                  <tr key={deals[item]._id} className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                            
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">{deals[item].dealOwner}</p>
                          <p className="text-xs text-gray-600"></p>
                        </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{deals[item].dealName}</td>
                    <td className="px-4 py-3 text-md border">
                      {deals[item].amount && <span className="px-2 py-1 font-semibold dealing-tight text-purple-700 rounded-sm">
                        {' '}
                        ₹{deals[item].amount}{' '}
                      </span>}
                    </td>
                    <td className="px-4 py-3 text-sm border">{deals[item].type}</td>
                    <td className="px-4 py-3 text-sm border">{deals[item].closingDate}</td> 

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

export default DisplayDeal;

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const deals = await Deal.find({}, { _id: 0, updatedAt: 0 }).lean();

    return {
      props: {
        deals: deals.map((deal) => ({
          ...deal,
          author: (deal.author) ? ((JSON.stringify(deal.author)).slice(1,-1)) : '',
          createdAt: deal.createdAt.toISOString(),
        })),
    },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { deals: [] },
    };
  }
}
