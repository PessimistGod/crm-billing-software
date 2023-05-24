import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Contact from '@/Models/createContact';
import connectDB from '@/Middleware/db';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { HiMinus } from 'react-icons/hi';


const DisplayContact = ({ contacts }) => {
  const router = useRouter()
  const [perPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
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


  const filteredContacts = contacts.filter((deal) => deal.author === registration);
  const totalFilteredContacts = filteredContacts.length;
  const totalPages = Math.ceil(totalFilteredContacts / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { page: page },
    });
  };
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const slicedContacts = filteredContacts.slice(startIndex, endIndex);

    const myLoader=({src, item})=>{
        return `/${contacts[item].imageName}`;
      }
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Contact Name</th>
                <th className="px-4 py-3">Account Name</th>
                
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Contact Owner</th>

              </tr>
            </thead>
            <tbody className="bg-white">
               {slicedContacts.map((item) => ( 
                  <tr key={item._id} className="text-gray-700">
              
                    <td className="px-4 py-3 text-ms font-semibold border">{item.companyName?item.companyName:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.accountName?item.accountName:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.email?item.email:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.phone?item.phone:<HiMinus size={16}/>}</td> 
                    <td className="px-4 py-3 text-sm border">{item.contactOwner?item.contactOwner:<HiMinus size={16}/>}</td> 
                  </tr>
                ))}
            </tbody>
          </table>
          {totalFilteredContacts  > perPage && (
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

export default DisplayContact;

export async function getServerSideProps({query}) {
  const { page = 1 } = query; 
  const perPage = 5;
  try {
    await connectDB();


    const totalDeals = await Contact.countDocuments(); 
    const totalPages = Math.ceil(totalDeals / perPage); 
    const contacts = await Contact.find({}, { updatedAt: 0 }).lean().sort({ createdAt: -1 });;

    return {
      props: {
        contacts: contacts.map((contact) => ({
          ...contact,
          _id: contact._id? String(contact._id):'',
          author: (contact.author) ? ((JSON.stringify(contact.author)).slice(1,-1)) : '',
          createdAt: contact.createdAt.toISOString(),
        })),
        totalPages,
    },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { contacts: [] ,totalPages: 0},
    };
  }
}
