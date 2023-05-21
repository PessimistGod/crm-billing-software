import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Sales from '@/Models/createSales';
import connectDB from '@/Middleware/db';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import SaveAsPDFButton from '@/Components/saveAsPdf';


const DisplayAccount = ({ sales }) => {
  console.log(sales);


  const router = useRouter()
  const [registration, setRegistration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
console.log(new Date(startDate))


// console.log(

//   Object.keys(sales)
//   .filter(
//     (sale) =>
//     sales[sale].author === registration
//     )
//     .map((item)=>sales[item]._id)
    
//     )


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
  const myLoader = ({ src, item }) => {
    return `/${sales[item].imageName}`;
  }
  function handleDateFilter() {
    const myDateFilter = sales.filter((sale) => {
      const createdAt = sale.createdAt
      return startDate <= createdAt && endDate >= createdAt;
    });
    console.log(myDateFilter);
  }
  return (
    <>
<div><SaveAsPDFButton /></div>
      <section className="container mx-auto p-6 font-mono">
        <div className="w-full overflow-x-auto">
          <div className="flex">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-3 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
        
          </div>

        </div>
      </section>



      <section className="container mx-auto p-6 font-mono" id="pdf-content">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3">Deal Name</th>
                  <th className="px-4 py-3">status</th>
                  <th className="px-4 -py-3">Annual Revenue</th>
                  <th className="px-4 py-3">Parent Account</th>
                  <th className="px-4 py-3">{handleDateFilter}</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {sales &&
                  Object.keys(sales)
                    .filter(
                      (sale) =>
                        sales[sale].author === registration  && (startDate === '' || sales[sale].createdAt >= startDate) && (endDate === '' || sales[sale].createdAt <= endDate)
                    ).map((item) => (
                      <tr key={sales[item]._id} className="text-gray-700">
                        <td className="px-4 py-3 border">
                          {sales[item].dealName}
                        </td>
                        <td className="px-4 py-3 text-ms font-semibold border">{}</td>

                        <td className="px-4 py-3 text-sm border">{sales[item].status}</td>
                        <td className="px-4 py-3 text-sm border">{sales[item].salesOwner}</td>

                        <td className=" py-2 text-ms font-semibold border"><button className='bg-blue-500 mx-auto px-5 py-3 border rounded-3xl'>View</button></td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default DisplayAccount;

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const { startDate, endDate } = context.query;

    let sales;
    if (startDate && endDate) {
      sales = await Sales.find({
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }, { updatedAt: 0 }).lean();
    } else {
      sales = await Sales.find({}, { updatedAt: 0 }).lean();
    }

    return {
      props: {
        sales: sales.map((sale) => ({
          ...sale,
          rows: sale.rows.map((item) => ({
            ...item,
            _id: String(item._id),
          })),
          _id: sale._id ? String(sale._id) : '',
          author: sale.author ? String(sale.author) : '',
          createdAt: sale.createdAt.toISOString(),
        })),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { sales: [] },
    };
  }
}
