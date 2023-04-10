import Image from 'next/image';
import React from 'react';
import Lead from '@/Models/createLead';
import connectDB from '@/Middleware/db';

const DisplayLead = ({ leads }) => {
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
                <th className="px-4 py-3">Lead Owner</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">View</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {leads &&
                Object.keys(leads).map((item) => (
                  <tr key={leads[item]._id} className="text-gray-700">
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
                          <p className="font-semibold text-black">{leads[item].leadOwner}</p>
                          <p className="text-xs text-gray-600">{leads[item].salutation}. {leads[item].name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{leads[item].company}</td>
                    <td className="px-4 py-3 text-xs border">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {' '}
                        {leads[item].leadStatus}{' '}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">{leads[item].createdAt.slice(0,10)}</td>
                    <td className="px-4 py-3 text-ms font-semibold border"><button className='bg-blue-500 px-2 py-3 border rounded-2xl'>View</button></td>
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
