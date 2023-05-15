import React, { useEffect, useState } from 'react';
import Lead from '@/Models/createLead';
import connectDB from '@/Middleware/db';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';
import { HiMinus } from 'react-icons/hi';




const DisplayLead = ({ leads }) => {


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

    const myLoader=({src, item})=>{
        return `/${leads[item].imageName}`;
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
              {leads &&
                Object.keys(leads).filter((lead) => (leads[lead].author === registration)).map((item) => (
                  <tr key={leads[item]._id} className="text-gray-700">
                    <td className="px-4 py-3 border">
                      <div className="flex items-center text-sm">

                            
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">{leads[item].name ? leads[item].name : <HiMinus size={16}/>}</p>
 
                        </div>

                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{leads[item].company?leads[item].company : <HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-xs border">

                      {leads[item].email?leads[item].email:<HiMinus size={16}/>}
                    </td>

                    <td className="px-4 py-3 text-sm border">{leads[item].phone?leads[item].phone : <HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{leads[item].leadSource? leads[item].leadSource: <HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{leads[item].leadOwner? leads[item].leadOwner: <HiMinus size={16}/>}</td>

                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DisplayLead;

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const leads = await Lead.find({}, { _id: 0, updatedAt: 0 }).lean();

    return {
      props: {
        leads: leads.map((lead) => ({
          ...lead,
          author: (lead.author) ? ((JSON.stringify(lead.author)).slice(1,-1)) : '',
          createdAt: lead.createdAt.toISOString(),
        })),
    },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { leads: [] },
    };
  }
}
