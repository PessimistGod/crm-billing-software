import React, { useEffect, useState } from 'react';
import Lead from '@/Models/createLead';
import connectDB from '@/Middleware/db';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { HiMinus } from 'react-icons/hi';




const DisplayLead = ({ leads }) => {


  const [registration, setRegistration] = useState('');
  const router = useRouter()
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

  const filteredLeads = leads.filter((deal) => deal.author === registration);
  const totalFilteredLeads = filteredLeads.length;
  const totalPages = Math.ceil(totalFilteredLeads / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { page: page },
    });
  };
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const slicedLeads = filteredLeads.slice(startIndex, endIndex);

    const myLoader=({src, item})=>{
        return `/${item.imageName}`;
      }
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Lead Name</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Lead Source</th>
                <th className="px-4 py-3">Lead Owner</th>

              </tr>
            </thead>
            <tbody className="bg-white">
              {slicedLeads.map((item) => (
                  <tr key={item._id} className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">
                        </div>
                        <div>
                          <p className="font-semibold text-black">{item.name ? item.name : <HiMinus size={16}/>}</p>
 
                        </div>

                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{item.company?item.company : <HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-xs border">

                      {item.email?item.email:<HiMinus size={16}/>}
                    </td>

                    <td className="px-4 py-3 text-sm border">{item.phone?item.phone : <HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.leadSource? item.leadSource: <HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.leadOwner? item.leadOwner: <HiMinus size={16}/>}</td>

                  </tr>
                ))}
            </tbody>
          </table>
          {totalFilteredLeads > perPage && (
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

export default DisplayLead;

export async function getServerSideProps({query}) {
  const { page = 1 } = query; 
  const perPage = 5;
  try {
    await connectDB();
    const totalDeals = await Lead.countDocuments(); 
    const totalPages = Math.ceil(totalDeals / perPage); 
    const leads = await Lead.find({}, { updatedAt: 0 }).lean().sort({ createdAt: -1 });



    return {
      props: {
        leads: leads.map((lead) => ({
          ...lead,
          _id:lead._id?String(lead._id):'',
          author: (lead.author) ? ((JSON.stringify(lead.author)).slice(1,-1)) : '',
          createdAt: lead.createdAt.toISOString(),
        })),
        totalPages,
    },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { leads: [], totalPages: 0 },
    };
  }
}
