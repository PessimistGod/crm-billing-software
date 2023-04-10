import Image from 'next/image';
import React from 'react';
import Contact from '@/Models/createContact';
import connectDB from '@/Middleware/db';

const DisplayContact = ({ contacts }) => {
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
                <th className="px-4 py-3">Contact Owner</th>
                <th className="px-4 py-3">Company Name</th>
                <th className="px-4 py-3">Job Title</th>
                <th className="px-4 py-3">email</th>
                <th className="px-4 py-3">phone</th>
                <th className="px-4 py-3">View</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {contacts &&
                Object.keys(contacts).map((item) => (
                  <tr key={contacts[item]._id} className="text-gray-700">
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
                          <p className="font-semibold text-black">{contacts[item].contactOwner}</p>
                          {contacts[item].name && <p className="text-xs text-gray-600">{contacts[item].salutation}. {contacts[item].name}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{contacts[item].companyName}</td>
                    <td className="px-4 py-3 text-md border">
                      <span className="px-2 py-1 font-semibold contacting-tight text-green-700 rounded-sm">
                        {' '}
                        {contacts[item].jobTitle}{' '}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">{contacts[item].email}</td>
                    <td className="px-4 py-3 text-sm border">{contacts[item].phone}</td> 

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

export default DisplayContact;

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const contacts = await Contact.find({}, { _id: 0, updatedAt: 0 }).lean();

    return {
      props: {
        contacts: contacts.map((contact) => ({
          ...contact,
          createdAt: contact.createdAt.toISOString(),
        })),
    },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { contacts: [] },
    };
  }
}
