import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ProductList from '@/Models/createProduct';
import connectDB from '@/Middleware/db';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode';
import { HiMinus } from 'react-icons/hi'


const DisplayAccount = ({ products }) => {
  console.log(products)

  const router = useRouter()
  const [registration, setRegistration] = useState('');
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

  const filteredProducts = products.filter((deal) => deal.author === registration);
  const totalFilteredProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalFilteredProducts / perPage);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: { page: page },
    });
  };
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const slicedProducts = filteredProducts.slice(startIndex, endIndex);

    const myLoader=({src, item})=>{
        return `/${products[item].imageName}`;
      }
  return (
    <section className="container mx-auto p-6 font-mono">
      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Product Code</th>
                <th className="px-4 -py-3">Unit Price </th>
                <th className="px-4 py-3">Quantity In Stock</th>
                <th className="px-4 py-3">Vendor Name</th>
                <th className="px-4 py-3">Product Owner</th>

              </tr>
            </thead>
            <tbody className="bg-white">
            {slicedProducts.map((item) => (
                  <tr key={item._id} className="text-gray-700">
                    <td className="px-4 py-3 text-sm border">{item.productName?item.productName:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.productCode?item.productCode:<HiMinus size={16}/>}</td>

                    <td className="px-4 py-3 text-sm border">{item.unitPrice?item.unitPrice:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.qty?item.qty:<HiMinus size={16}/>}</td>


              
                    <td className="px-4 py-3 text-sm border">{item.vendorName?item.vendorName:<HiMinus size={16}/>}</td>
                    <td className="px-4 py-3 text-sm border">{item.productOwner?item.productOwner:<HiMinus size={16}/>}</td> 


                  </tr>
                ))}
            </tbody>
          </table>
          {totalFilteredProducts > perPage && (
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

export default DisplayAccount;

export async function getServerSideProps({query}) {
  const { page = 1 } = query; 
  const perPage = 5;
  try {
    await connectDB();
    const totalDeals = await ProductList.countDocuments(); 
    const totalPages = Math.ceil(totalDeals / perPage); 
    const products = await ProductList.find({}, { updatedAt: 0 }).lean().sort({ createdAt: -1 });

    return {
      props: {
        products: products.map((product) => ({
          ...product,
          _id: (product._id) ? ((JSON.stringify(product._id)).slice(1,-1)) : '',
          author: (product.author) ? ((JSON.stringify(product.author)).slice(1,-1)) : '',
          createdAt: product.createdAt.toISOString(),
        })),
        totalPages,
      },
    };
  } 
  catch (error) {
    console.log(error);
    return {
      props: { products: [], totalPages:0 },
    };
  }
}
