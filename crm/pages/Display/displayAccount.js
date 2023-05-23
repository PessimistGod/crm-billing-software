import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Account from '@/Models/createAccount';
import connectDB from '@/Middleware/db';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { HiMinus } from 'react-icons/hi';


const DisplayAccount = ({ accounts }) => {

  const [perPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
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
  }, [currentPage, perPage]);


  const totalPages = Math.ceil(accounts.length / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { page: page },
    });
  };
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const slicedAccounts = accounts.slice(startIndex, endIndex);

  
  const myLoader = ({ src, item }) => {
    return `/${accounts[item].imageName}`;
  }
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Account Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Website</th>
                <th className="px-4 -py-3">Account Owner</th>

              </tr>
            </thead>
            <tbody className="bg-white">
              {slicedAccounts.map((item) => (
                  <tr key={item._id} className="text-gray-700">
                    <td className="px-4 py-3 text-sm border">{item.accountName?item.accountName:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.phone?item.phone:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.website?item.website:<HiMinus size={16}/>}</td>
              
                    <td className="px-4 py-3 text-sm border">{item.accountOwner?item.accountOwner:<HiMinus size={16}/>}</td>
                
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-2 py-1 mx-1 rounded-lg ${
                  page === currentPage ? 'bg-gray-300' : 'bg-gray-200'
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayAccount;

export async function getServerSideProps({query}) {

  const { page = 1 } = query; 
  const perPage = 5;
  try {
    await connectDB();
    const totalDeals = await Account.countDocuments(); 
    const totalPages = Math.ceil(totalDeals / perPage); 
    const accounts = await Account.find({}, { updatedAt: 0 }).lean().sort({ createdAt: -1 });;

    return {
      props: {
        accounts: accounts.map((account) => ({
          ...account,
          _id: (account._id) ? ((JSON.stringify(account._id)).slice(1, -1)) : '',
          author: (account.author) ? ((JSON.stringify(account.author)).slice(1, -1)) : '',
          createdAt: account.createdAt.toISOString(),
        })),
        totalPages,
      },
    };
  }
  catch (error) {
    console.log(error);
    return {
      props: { accounts: [] ,totalPages: 0},
    };
  }
}
