import Image from 'next/image';
import React from 'react';
import Account from '@/Models/createAccount';
import connectDB from '@/Middleware/db';

const DisplayAccount = ({ accounts }) => {
    const myLoader=({src, item})=>{
        return `/${accounts[item].imageName}`;
      }
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Account Owner</th>
                <th className="px-4 py-3">Account Name</th>
                <th className="px-4 py-3">Ownership</th>
                <th className="px-4 py-3">Annual Revenue</th>
                <th className="px-4 py-3">Parent Account</th>
                <th className="px-4 py-3">View</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {accounts &&
                Object.keys(accounts).map((item) => (
                  <tr key={accounts[item]._id} className="text-gray-700">
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
                          <p className="font-semibold text-black">{accounts[item].accountOwner}</p>
                          <p className="text-xs text-gray-600"></p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ms font-semibold border">{accounts[item].ownership}</td>
                    <td className="px-4 py-3 text-md border">
                      <span className="px-2 py-1 font-semibold accounting-tight text-green-700 rounded-sm">
                        {' '}
                        {accounts[item].ownership}{' '}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm border">{accounts[item].revenue}</td>
                    <td className="px-4 py-3 text-sm border">{accounts[item].parentAccount}</td> 

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

export default DisplayAccount;

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const accounts = await Account.find({}, { _id: 0, updatedAt: 0 }).lean();

    return {
      props: {
        accounts: accounts.map((account) => ({
          ...account,
          createdAt: account.createdAt.toISOString(),
        })),
    },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { accounts: [] },
    };
  }
}