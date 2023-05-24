import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Purchases from '@/Models/createPurchase';
import connectDB from '@/Middleware/db';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import SaveAsPDFButton from '@/Components/saveAsPdf';
import moment from 'moment'
import { HiMinus } from 'react-icons/hi';

const DisplayAccount = ({ purchases }) => {


  const router = useRouter()
  const [registration, setRegistration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const filteredPurchasesWithSelect = purchases.filter((purchase) => {
    if (selectValue === '') {
      return true;
    } else {
      return purchase.subject.startsWith(selectValue); 
    }
  });

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

  const filteredPurchases = purchases
.filter((deal) => deal.author === registration)
.filter((purchase) => {
  if (selectValue === '') {
    return true;
  } else {
    return purchase.subject.toLowerCase().startsWith(selectValue);
  }
});

  const totalFilteredPurchases = filteredPurchases.length;
  const totalPages = Math.ceil(totalFilteredPurchases / perPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { page: page, startDate: startDate || '', endDate: endDate || '',selectValue: selectValue || '', },
    });
  };
const startIndex = (currentPage - 1) * perPage;
const endIndex = startIndex + perPage;
const slicedPurchases = filteredPurchases.slice(startIndex, endIndex);

function handleResetFilter(e) {
  setStartDate('');
  setEndDate('');
  setSelectValue('')
  router.push('/Display/displayPurchase')
}
  
const handleConvert= async(id)=>{
  const response = await fetch(`/api/Update/approvePurchaseConvert?id=${id}`, { method: 'PUT' });
      const data = await response.json();
      if (data.success) {
        console.log(data.success)
        router.push({
          pathname: '/Display/displayTemplates',
          query: { id: id }
      })
}
 
  
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
                  <th className="px-4 py-3">Purchases Order Owner</th>


                </tr>
              </thead>
              <tbody className="bg-white">
              {slicedPurchases
                  .filter(
                    (purchase) =>
                      (startDate === '' || purchase.createdAt >= startDate) &&
                      (endDate === '' || purchase.createdAt <= endDate)
                  )
                  .filter((purchase) => {
                    if (selectValue === '') {
                      return true;
                    } else {
                      const lowerCaseSelectValue = selectValue.toLowerCase();
    const upperCaseSelectValue = selectValue.toUpperCase();
    const subject = purchase.subject.toLowerCase();
    return subject.startsWith(lowerCaseSelectValue) || subject.startsWith(upperCaseSelectValue)
                    }
                  })
                  .map((item) => (
                      <tr key={item._id} className="text-gray-700">
                        <td className="px-4 py-3 text-sm border">{item.subject?item.subject:<HiMinus size={16}/>} {!item.converted && <button className='px-2 py-1 bg-red-300 ml-10 hover:bg-red-400 text-black hover:text-white font-semibold rounded-lg' onClick={(e)=>handleConvert(item._id)}>Convert Purchase</button>}</td>

                        <td className="px-4 py-3 text-sm border">{item.status?item.status:<HiMinus size={16}/>}</td>
                        <td className="px-4 py-3 text-sm border">{item.grandTotal?item.grandTotal:<HiMinus size={16}/>}</td>
                        <td className="px-4 py-3 text-sm border">{item.vendorName?item.vendorName:<HiMinus size={16}/>}</td>
                        <td className="px-4 py-3 text-sm border">{item.contactName?item.contactName:<HiMinus size={16}/>}</td>

                

                        <td className="px-4 py-3 text-sm border">{item.purchaseOwner?item.purchaseOwner:<HiMinus size={16}/>}</td>

                       </tr>
                    ))}
              </tbody>
            </table>
  
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
          </div>
        </div>
      </section>
    </>
  );
};

export default DisplayAccount;





export async function getServerSideProps({ query }) {
  const { page = 1, startDate, endDate } = query;
  const perPage = 5;

  try {
    await connectDB();

    let purchases;
    let totalFilteredPurchases;
    if (startDate && endDate) {
      purchases = await Purchases.find(
        {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
        { updatedAt: 0 }
      )
        .lean()
        .sort({ createdAt: -1 });

      totalFilteredPurchases = purchases.length;
    } else {
      purchases = await Purchases.find({}, { updatedAt: 0 }).lean().sort({ createdAt: -1 });
      totalFilteredPurchases = purchases.length;
    }

    const totalPages = Math.ceil(totalFilteredPurchases / perPage);

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
        totalPages,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { purchases: [], totalPages: 0 },
    };
  }
}