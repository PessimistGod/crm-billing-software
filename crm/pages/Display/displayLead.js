import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Lead from '@/Models/createLead';
import connectDB from '@/Middleware/db';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';





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
                        {/* <div className="relative w-8 h-8 mr-3 rounded-full md:block"> */}

                             {/* <Image
                             width={300}
                             height={300}
                             className="object-cover w-full h-full rounded-full"
                             src={myLoader({ item })}
                             alt="Logo"
                             /> */}
                            
                          <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-black">{leads[item].name}</p>
                          {/* <p className="text-xs text-gray-600">{leads[item].salutation}. {leads[item].name}</p> */}
                        </div>
                      {/* </div> */}
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{leads[item].company}</td>
                    <td className="px-4 py-3 text-xs border">
                      {/* <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {' '}
                        {leads[item].leadStatus}{' '}
                      </span> */}
                      {leads[item].email}
                    </td>
                    {/* <td className="px-4 py-3 text-sm border">{leads[item].createdAt.slice(0,10)}</td>
                    <td className="px-4 py-3 text-ms font-semibold border"><button className='bg-blue-500 px-2 py-3 border rounded-2xl'>View</button></td> */}
                    <td className="px-4 py-3 text-sm border">{leads[item].phone}</td>
                    <td className="px-4 py-3 text-sm border">{leads[item].leadSource}</td>
                    <td className="px-4 py-3 text-sm border">{leads[item].leadOwner}</td>

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
