import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Deal from '@/Models/createDeal';
import connectDB from '@/Middleware/db';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { HiMinus } from 'react-icons/hi';

const DisplayDeal = ({ deals }) => {
  const [registration, setRegistration] = useState('');
  const router = useRouter();
  const [perPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [currentPage, perPage]);

  const filteredDeals = deals.filter((deal) => deal.author === registration);
  const totalFilteredDeals = filteredDeals.length;
  const totalPages = Math.ceil(totalFilteredDeals / perPage);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { page: page },
    });
  };
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const slicedDeals = filteredDeals.slice(startIndex, endIndex);

  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Deal Name</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Closing Date</th>
                <th className="px-4 py-3">Account Name</th>
                <th className="px-4 py-3">Contact Name</th>
                <th className="px-4 py-3">Deal Owner</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {slicedDeals.map((item) => (
                <tr key={item._id} className="text-gray-700">
                  <td className="px-4 py-3 text-sm border">
                    {item.dealName ? item.dealName : <HiMinus size={16} />}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {item.amount ? item.amount : <HiMinus size={16} />}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {item.closingDate ? item.closingDate : <HiMinus size={16} />}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {item.accountName ? item.accountName : <HiMinus size={16} />}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {item.contactName ? item.contactName : <HiMinus size={16} />}
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {item.dealOwner ? item.dealOwner : <HiMinus size={16} />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalFilteredDeals > perPage && (
       <div className="flex justify-center mt-4 py-2">
       <ul className="flex space-x-1">
         {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
           <li key={page} aria-current={page === currentPage ? 'page' : undefined}>
             <a
               className={`px-2 py-1 mx-1 rounded-lg ${
                 page === currentPage ? 'bg-gray-300' : 'bg-gray-200'
               }`}
               href="#!"
               onClick={() => handlePageChange(page)}
             >
               <span className="sr-only">{page}</span>
               {page}
             </a>
           </li>
         ))}
       </ul>
     </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DisplayDeal;

export async function getServerSideProps({ query }) {
  const { page = 1 } = query; 
  const perPage = 5;

   connectDB();
  try {

    const totalDeals = await Deal.countDocuments(); 
    const totalPages = Math.ceil(totalDeals / perPage); 

    const deals = await Deal.find({}, { updatedAt: 0 })
      .lean().sort({ createdAt: -1 });

    return {
      props: {
        deals: deals.map((deal) => ({
          ...deal,
          _id:deal._id ? String(deal.id): '',
          author: deal.author ? JSON.stringify(deal.author).slice(1, -1) : '',
          createdAt: deal.createdAt.toISOString(),
        })),
        totalPages,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { deals: [], totalPages: 0 },
    };
  }
}
