import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Purchases from '@/Models/createPurchase';
import connectDB from '@/Middleware/db';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import SaveAsPDFButton from '@/Components/saveAsPdf';
import moment from 'moment'
import { HiMinus } from 'react-icons/hi'

const DisplayPurchase = ({ purchases }) => {
  console.log(purchases);


  const router = useRouter()
  const [registration, setRegistration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectValue, setSelectValue] = useState('');


  const filteredSalesWithSelect = purchases.filter((purchase) => {
    if (selectValue === '') {
      return true; // No select value, include all purchases
    } else {
      return purchase.dealName.startsWith(selectValue); // Filter based on the select value
    }
  });

  console.log(filteredSalesWithSelect);
  // You can update the state or perform any other action based on the filtered data



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
    return `/${purchases[item].imageName}`;
  }

console.log(purchases.map(item=>item.createdAt))


// function handleDateFilter(startDate, endDate) {
//   const parsedStartDate = new Date(startDate);
//   const parsedEndDate = new Date(endDate);
  
//   if (!isNaN(parsedStartDate) && !isNaN(parsedEndDate)) {
//     console.log("Parsed start date:", parsedStartDate.toISOString());
//     console.log("Parsed end date:", parsedEndDate.toISOString());

//     const myDateFilter = purchases.filter((filtSale) => {
//       const saleDate = new Date(filtSale.createdAt);
//       console.log("Parsed purchase date:", saleDate.toISOString());
//       return !isNaN(saleDate) && saleDate >= parsedStartDate && saleDate <= parsedEndDate;
//     }).map((purchase) => purchase);

//     console.log("Filtered purchases:", myDateFilter);

//     return myDateFilter; // Return the filtered purchases array if needed
//   }
// }


function handleResetFilter(e){
  setStartDate('');
  setEndDate('')
}

  
 
  
  
  return (
    <>
<div className='flex justify-end px-2 py-4'><SaveAsPDFButton /></div>
<section className="font-mono">
  <div className="w-full md:w-1/2">
    <div className="flex flex-wrap md:flex-nowrap justify-end border">
      <div className="bg-white px-2 border rounded-l-lg mr-2">
        <label htmlFor="startDate" className="bg-gray-200 py-3 px-2">
          Between
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-4 py-2 focus:outline-none"
        />
      </div>
      <div className="bg-white px-2 border rounded-r-lg">
        <label className="bg-gray-200 py-3 px-4" htmlFor="startDate">
          To
        </label>
        <input
          type="date"
          value={endDate.slice(0, 10)}
          onChange={(e) => setEndDate(e.target.value + "T23:59:59")}
          className="px-4 py-2 focus:outline-none"
        />
      </div>
      <div className="flex items-center">
        <input
          type="submit"
          className="px-2 md:px-4 md:py-1 bg-red-400 border rounded-3xl ml-2 my-2 md:my-0 self-stretch"
          value="Reset"
          onClick={(e) => handleResetFilter(e)}
        />
      </div>
    </div>
  </div>
</section>






      <section className="container mx-auto p-6 font-mono" id="pdf-content">
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3"><span className='mr-8'>Subject</span>
                <span>

                    <select
                      name="atoz"
                      id="atoz"
                      value={selectValue}
                      className='px-2 border rounded-full bg-white'
                      onChange={(e) => setSelectValue(e.target.value)}
                      >
                      <option className='bg-white p-4' value="">All</option>
                      <option className='bg-white p-4' value="a">a</option>
                      <option className='bg-white p-4' value="b">b</option>
                      <option className='bg-white p-4' value="c">c</option>
                      <option className='bg-white p-4' value="d">d</option>
                      <option className='bg-white p-4' value="e">e</option>
                      <option className='bg-white p-4' value="f">f</option>
                      <option className='bg-white p-4' value="g">g</option>
                      <option className='bg-white p-4' value="h">h</option>
                      <option className='bg-white p-4' value="i">i</option>
                      <option className='bg-white p-4' value="j">j</option>
                      <option className='bg-white p-4' value="k">k</option>
                      <option className='bg-white p-4' value="l">l</option>
                      <option className='bg-white p-4' value="m">m</option>
                      <option className='bg-white p-4' value="n">n</option>
                      <option className='bg-white p-4' value="o">o</option>
                      <option className='bg-white p-4' value="p">p</option>
                      <option className='bg-white p-4' value="q">q</option>
                      <option className='bg-white p-4' value="r">r</option>
                      <option className='bg-white p-4' value="s">s</option>
                      <option className='bg-white p-4' value="t">t</option>
                      <option className='bg-white p-4' value="u">u</option>
                      <option className='bg-white p-4' value="v">v</option>
                      <option className='bg-white p-4' value="w">w</option>
                      <option className='bg-white p-4' value="x">x</option>
                      <option className='bg-white p-4' value="y">y</option>
                      <option className='bg-white p-4' value="z">z</option>


                    </select>
                      </span>
                  </th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 -py-3">Grand Total</th>
                  <th className="px-4 py-3">Vendor Name</th>
                  <th className="px-4 py-3">Contact Name</th>
                  <th className="px-4 py-3">Purchase Order Owner</th>


                </tr>
              </thead>
              <tbody className="bg-white">
                {purchases &&
                Object.keys(purchases)
                .filter(
                  (purchase) =>
                    purchases[purchase].author === registration  && (startDate === '' || purchases[purchase].createdAt >= startDate) && (endDate === '' || purchases[purchase].createdAt <= endDate)
                ).filter((purchase) => {
                  if (selectValue === '') {
                    return true; 
                  } else {
                    return purchases[purchase].dealName.startsWith(selectValue); 
                  }
                }).map((item) => (
                      <tr key={purchases[item]._id} className="text-gray-700">
                        <td className="px-4 py-3 text-sm border">{purchases[item].subject?purchases[item].subject:<HiMinus size={16}/>}</td>
                        <td className="px-4 py-3 text-sm border">{purchases[item].status?purchases[item].status:<HiMinus size={16}/>}</td>
                        <td className="px-4 py-3 text-sm border">{purchases[item].grandTotal?purchases[item].grandTotal:<HiMinus size={16}/>}</td>
                        <td className="px-4 py-3 text-sm border">{purchases[item].vendorName?purchases[item].vendorName:<HiMinus size={16}/>}</td>
                        <td className="px-4 py-3 text-sm border">{purchases[item].contactName?purchases[item].contactName:<HiMinus size={16}/>}</td>
                        <td className="px-4 py-3 text-sm border">{purchases[item].purchaseOwner?purchases[item].purchaseOwner:<HiMinus size={16}/>}</td>
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

export default DisplayPurchase;

export async function getServerSideProps(context) {
  try {
    await connectDB();

    const { startDate, endDate } = context.query;

    let purchases;
    if (startDate && endDate) {
      purchases = await Purchases.find({
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      }, { updatedAt: 0 }).lean();
    } else {
      purchases = await Purchases.find({}, { updatedAt: 0 }).lean();
    }

    return {
      props: {
        purchases: purchases.map((purchase) => ({
          ...purchase,
          rows: purchase.rows.map((item) => ({
            ...item,
            _id: String(item._id),
          })),
          _id: purchase._id ? String(purchase._id) : '',
          author: purchase.author ? String(purchase.author) : '',
          createdAt: purchase.createdAt.toISOString(),
        })),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { purchases: [] },
    };
  }
}
