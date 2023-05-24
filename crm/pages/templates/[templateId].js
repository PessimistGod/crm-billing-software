import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi';
import Images from '@/Models/Image'
import connectDB from '@/Middleware/db';
import jwt_decode from 'jwt-decode';
import SaveAsPDFButton from '@/Components/saveAsPdf'
import Company from '@/Models/createCompany';



const TemplatePage = ({ images, company }) => {
    const router = useRouter();
    const { id } = router.query
    const [salesData, setSalesData] = useState(null)
    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                // Fetch sales data from the API
                const response = await fetch(`/api/Fetching/getSalesdata?id=${id}`);
                const data = await response.json();

                if (response.ok) {
                    setSalesData(data.salesData);
                } else {
                    // Handle API errors
                    console.error(data.error);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchSalesData();
        }
    }, [id]);
    const [registration, setRegistration] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            if (token) {
                const decodedToken = jwt_decode(token);
                setRegistration(decodedToken.id);
            } else {
                // router.push('/Authenticate/Login');
            }
        } catch (error) {
            console.error(error);
            // router.push('/Authenticate/Login');
        }
    }, []);

    const companyDetails = company.filter(item => item.author === registration);
    const ImageDetails = images.filter(item => item.author === registration)

    const [paymentStatus, setPaymentStatus] = useState('Pending');

    const handleStatusChange = (e) => {
        setPaymentStatus(e.target.value);
    };

    const SalesTax = salesData && salesData.rows && salesData.rows.length > 0 ? salesData.rows.map(item => parseFloat(item.tax)) : ['hi'];
    const hasSalesTax = SalesTax.some(value => !isNaN(value));

    // console.log(salesData.shippingCity)



    const date = salesData !== null && salesData.createdAt !== null && salesData.createDate !== null ? salesData.createDate || salesData.createdAt.slice(0, 10) : '';

    const parts = date.split('-');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;




    const calculateTotalQty = () => {
        if (salesData && salesData.rows) {
            return salesData.rows.reduce((total, row) => total + (parseInt(row.qty) || 0), 0);
        }
        return 0;
    };

    const calculateTotalPrice = () => {
        if (salesData && salesData.rows) {
            return salesData.rows.reduce((total, row) => total + (parseInt(row.price) || 0), 0);
        }
        return 0;
    };

    const calculateTotalTax = () => {
        if (salesData && salesData.rows) {
            return salesData.rows.reduce((total, row) => total + (parseInt(row.tax) || 0), 0);
        }
        return 0;
    };
    const calculateTotalDiscount = () => {
        if (salesData && salesData.rows) {
            return salesData.rows.reduce((total, row) => total + (parseInt(row.discount) || 0), 0);
        }
        return 0;
    };

    const calculateTotalAmount = () => {
        if (salesData && salesData.rows) {
            return salesData.rows.reduce((total, row) => total + (parseInt(row.total) || 0), 0);
        }
        return 0;
    };





    function NumInWords(number) {
        try {
            if (isNaN(number)) {
                return 0
            }
            const first = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
            const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
            const mad = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];
            let word = '';

            for (let i = 0; i < mad.length; i++) {
                let tempNumber = number % (100 * Math.pow(1000, i));
                if (Math.floor(tempNumber / Math.pow(1000, i)) !== 0) {
                    if (Math.floor(tempNumber / Math.pow(1000, i)) < 20) {
                        word = first[Math.floor(tempNumber / Math.pow(1000, i))] + mad[i] + ' ' + word;
                    } else {
                        word = tens[Math.floor(tempNumber / (10 * Math.pow(1000, i)))] + '-' + first[Math.floor(tempNumber / Math.pow(1000, i)) % 10] + mad[i] + ' ' + word;
                    }
                }

                tempNumber = number % (Math.pow(1000, i + 1));
                if (Math.floor(tempNumber / (100 * Math.pow(1000, i))) !== 0) word = first[Math.floor(tempNumber / (100 * Math.pow(1000, i)))] + 'Hundred ' + word;
            }
            return word;
        } catch (e) {
            console.log(e)
        }
    }

    console.log(NumInWords())


    const { templateId } = router.query;

    if (templateId === '1') {


        return (
            <>
                <div className='flex justify-end'>
                    <div className="bg-white hover:bg-black hover:text-white font-bold py-2 px-4 rounded">
                        <select className="bg-white hover:bg-black hover:text-white rounded" id="paymentStatus" value={paymentStatus} onChange={handleStatusChange}>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div ><SaveAsPDFButton /></div>


                </div>

                <div className='md:w-[45%] md:mx-auto'>
                    <section id="pdf-content" className='bg-white relative'>
                        <div className='mx-2 my-2 relative'>

                            <div className='bg-black w-7/12 py-5 rounded-r-full'>


                                {images && ImageDetails.length > 0 ? (
                                    <img
                                        alt='Company'
                                        className='w-2/12 ml-2 -mt-3 object-contain'
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                        src={`/${process.env.NEXT_PUBLIC_FOLDER}/${ImageDetails[0].url.slice(15)}`}
                                    />
                                ) : (
                                    <img
                                        alt='Company'
                                        className='w-2/12 ml-2 -mt-3 object-contain'
                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                        src={'/90.png'}
                                    />
                                )
                                }


                                <div className='text-lg text-white font-bold ml-2 z-30 mt-1 md:text-2xl'>{companyDetails.length > 0 ? companyDetails[0].companyName.toUpperCase() : "Your Company Name"}</div>
                                <span className='text-xs text-white font-bold ml-2 block md:mt-1'>GSTIN: {companyDetails.length > 0 ? companyDetails[0].gstin.toUpperCase() : ""}</span>

                            </div>

                            <div className=' absolute top-16 right-6 font-bold text-lg md:text-2xl md:mt-5 md:mr-6'>
                                {hasSalesTax && "TAX"} INVOICE
                            </div>

                            <div className="bg-fuchsia-700 w-[78%] absolute right-0 top-0 rounded-bl-full py-5 md:py-6 overflow-x-auto">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center justify-center">
                                        <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                            <FiPhoneCall />
                                        </span>
                                        <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">{companyDetails.length > 0 ? companyDetails[0].companyPhone : "+91 99434XXXX"}</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                            <FiMail />
                                        </span>
                                        <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">{companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                            <FiMapPin />
                                        </span>
                                        <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">location, {companyDetails.length > 0 ? companyDetails[0].companyCountry : "Country"},{companyDetails.length > 0 ? companyDetails[0].companyState : "State"}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='mx-2 flex justify-between'>
                            <div className='py-4 px-2'>
                                <span className='text-fuchsia-600 font-semibold text-xl '>
                                    Bill To:
                                </span>
                                <div>
                                    <div>
                                        Jyothy Institute Of Technology
                                    </div>
                                    <div>
                                        {salesData && salesData.shippingCity}, {salesData && salesData.shippingState}
                                    </div>
                                    <div>
                                        +91 9035239238
                                    </div>
                                    {hasSalesTax && <div>
                                        <span className='text-md'>GSTIN: </span> 29AMWPD4772D1ZJ
                                    </div>}
                                    <div>
                                        {salesData && "State Code:" + salesData.shippingCode}
                                    </div>
                                </div>
                            </div>

                            <div className='py-4 px-2'>
                                <div >
                                    Date:{formattedDate}
                                </div>
                                <div>
                                    Invoice Number:{salesData && salesData._id.slice(-5).toUpperCase()}
                                </div>

                            </div>


                        </div>



                        <div className='mx-2'>
                            <div className="overflow-x-auto">
                                <table className="mx-auto">
                                    <thead className="bg-fuchsia-500">
                                        <tr className="">
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-900 ">S No</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-900">ITEM NAME</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-900">QTY</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-900">Price/Unit</th>
                                            {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">TAX</th>}
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">Discount</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salesData && salesData.rows && salesData.rows.map((row, index) => (
                                            <tr key={index} className="">
                                                <td className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{index + 1}</td>
                                                <td className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{row.prodName}</td>
                                                <td className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{row.qty}</td>
                                                <td className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{row.price || 0}₹</td>
                                                {hasSalesTax && <td className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{row.tax && row.tax || 0}%</td>}
                                                <td className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{row.discount || 0}%</td>
                                                <td className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{row.total}₹</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    <tfoot className="bg-fuchsia-500 ">
                                        <tr className="text-center">
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800"></th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">TOTAL</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{calculateTotalQty()}</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{calculateTotalPrice() + "₹"}</th>
                                            {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{calculateTotalTax() + "%"}</th>}
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{calculateTotalDiscount()}%</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-fuchsia-800">{calculateTotalAmount()}₹</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        <div className='flex justify-between mx-4 py-4'>

                            <div className=''>
                                {hasSalesTax &&
                                    <div>
                                        <table className='w-2/3'>
                                            <tbody>
                                                <tr>
                                                    <th className="px-4 py-2 my-auto font-bold bg-fuchsia-400 border border-fuchsia-800">Tax Type</th>
                                                    <th className="px-4 py-2 my-auto font-bold bg-fuchsia-400 border border-fuchsia-800">Rate</th>
                                                    <th className="px-4 py-2 my-auto font-bold bg-fuchsia-400 border border-fuchsia-800">Tax Amount</th>
                                                </tr>
                                                {salesData &&
                                                    salesData.rows &&
                                                    salesData.rows.map((row, index) => (
                                                        <React.Fragment key={index}>
                                                            <tr>
                                                                <td className="px-4 border-gray-600 border py-2">SGST</td>
                                                                <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                                <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="px-4 border-gray-600 border py-2">CGST</td>
                                                                <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                                <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                                            </tr>
                                                        </React.Fragment>
                                                    ))}
                                            </tbody>

                                        </table>



                                    </div>
                                }

                                <div className='text-fuchsia-400 font-bold'>TOTAL PRICE IN WORDS</div>
                                <div className='text-black font-bold w-2/3'>{NumInWords(calculateTotalAmount())} Rupees Only</div>
                            </div>

                            {/* <div className='border rounded-lg  p-2  h-[28vh] '> */}
                            <div>

                                <table className='w-full max-w-xs overflow-x-auto '>
                                    <tbody className=''>
                                        <tr>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Total Qty</td>
                                            {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{calculateTotalQty()}{ }</td>}
                                        </tr>
                                        <tr>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Sub Total</td>
                                            {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.subTotal}₹</td>}
                                        </tr>
                                        {hasSalesTax && <tr >
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Total Tax</td>
                                            {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalTax || 0}%</td>}
                                        </tr>}
                                        <tr>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Total Discount</td>
                                            {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalDiscount || 0}%</td>}
                                        </tr>
                                        <tr className='bg-fuchsia-300'>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Grand Total</td>
                                            {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.grandTotal}₹</td>}
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="flex items-center justify-center bg-gray-200 py-2 px-4 rounded font-bold">
                                    <span className="mr-2">Payment Status:</span>
                                    <span className="text-fuchsia-600">{paymentStatus}</span>
                                </div>



                            </div>


                        </div>






                    </section>
                </div>
            </>
        );
    } else if (templateId === '2') {
        return (
            <>
            <div className='flex justify-end'>
                 <div className="bg-white hover:bg-black hover:text-white font-bold py-2 px-4 rounded">
                     <select className="bg-white hover:bg-black hover:text-white rounded" id="paymentStatus" value={paymentStatus} onChange={handleStatusChange}>
                         <option value="Pending">Pending</option>
                         <option value="Completed">Completed</option>
                         <option value="Cancelled">Cancelled</option>
                     </select>
                 </div>
            
                 <div ><SaveAsPDFButton /></div>
            
            
             </div>
            
             <div className='md:w-[45%] md:mx-auto'>
                 <section id="pdf-content" className='bg-white relative'>
                     <div className='mx-2 my-2 relative'>
            
                         <div className=' py-5 bg-sky-400 flex'>
            
                         <div>
            
            
                             {images && ImageDetails.length > 0 ? (
                                 <img
                                     alt='Company'
                                     className='w-2/12 ml-2 -mt-3 object-contain rounded-full '
                                     style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                     src={`/${process.env.NEXT_PUBLIC_FOLDER}/${ImageDetails[0].url.slice(15)}`}
                                 />
                                 ) : (
                                 <img
                                     alt='Company'
                                     className='w-2/12 ml-2 -mt-3 object-contain'
                                     style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                     src={'/90.png'}
                                 />
                             )
                             }
            
            
                             <div className='text-lg text-white font-bold ml-2 z-30 mt-1 md:text-2xl'>{companyDetails.length > 0 ? companyDetails[0].companyName.toUpperCase() : "Your Company Name"}</div>
                             <span className='text-xs text-white font-bold ml-2 block md:mt-1'>GSTIN: {companyDetails.length > 0 ? companyDetails[0].gstin.toUpperCase() : ""}</span>
            
            
            
                                 </div>
            
            
                             <div className="flex justify-around mr-10 font-bold text-md">
                                 <div className="flex items-center justify-center">
                                     <span className="ml-2 border-r-2 border-white px-1 text-white">
                                         <FiPhoneCall />
                                     </span>
                                     <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">{companyDetails.length > 0 ? companyDetails[0].companyPhone : "+91 99434XXXX"}</span>
                                 </div>
                                 <div className="flex items-center justify-center">
                                     <span className="ml-2 border-r-2 border-white px-1 text-white">
                                         <FiMail />
                                     </span>
                                     <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 "><a target='_blank' href={`mailto:${companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}`}>{companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}</a></span>
                                 </div>
                                 <div className="flex items-center justify-center">
                                     <span className="ml-2 border-r-2 border-white px-1 text-white">
                                         <FiMapPin />
                                     </span>
                                     <span className="ml-1 text-white whitespace-nowrap -mt-4 text-sm">location, {companyDetails.length > 0 ? companyDetails[0].companyCountry : "Country"},{companyDetails.length > 0 ? companyDetails[0].companyState : "State"}</span>
                                 </div>
                             </div>
            
            
                         
                         </div>
            
                        
            
                         
                             
            
                     </div>
                     <div className='font-bold text-lg md:text-xl md:mt-5 md:mr-6 flex justify-center text-sky-500'>
                             {hasSalesTax && "TAX"} INVOICE
                         </div>
            
                     <div className='mx-2 flex justify-between'>
                         <div className='py-4 px-2'>
                             <span className='text-sky-600 font-semibold text-xl '>
                                 Bill To:
                             </span>
                             <div>
                                 <div>
                                     Jyothy Institute Of Technology
                                 </div>
                                 <div>
                                     {salesData && salesData.shippingCity}, {salesData && salesData.shippingState}
                                 </div>
                                 <div>
                                     +91 9035239238
                                 </div>
                                 {hasSalesTax && <div>
                                     <span className='text-md'>GSTIN: </span> 29AMWPD4772D1ZJ
                                 </div>}
                                 <div>
                                     {salesData && "State Code:" + salesData.shippingCode}
                                 </div>
                             </div>
                         </div>
            
                         <div className='py-4 px-2'>
                             <div >
                                 Date:{formattedDate}
                             </div>
                             <div>
                                 Invoice Number:{salesData && salesData._id.slice(-5).toUpperCase()}
                             </div>
            
                         </div>
            
            
                     </div>
            
            
            
                     <div className='mx-2'>
                         <div className="overflow-x-auto">
                             <table className="mx-auto">
                                 <thead className="bg-sky-500">
                                     <tr className="">
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-900 ">S No</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-900">ITEM NAME</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-900">QTY</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-900">Price/Unit</th>
                                         {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">TAX</th>}
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">Discount</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">Amount</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {salesData && salesData.rows && salesData.rows.map((row, index) => (
                                         <tr key={index} className="">
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{index + 1}</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.prodName}</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.qty}</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.price || 0}₹</td>
                                             {hasSalesTax && <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.tax && row.tax || 0}%</td>}
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.discount || 0}%</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.total}₹</td>
                                         </tr>
                                     ))}
                                 </tbody>
            
                                 <tfoot className="">
                                     <tr className="text-center">
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800"></th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">TOTAL</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalQty()}</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalPrice() + "₹"}</th>
                                         {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalTax() + "%"}</th>}
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalDiscount()}%</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalAmount()}₹</th>
                                     </tr>
                                 </tfoot>
                             </table>
                         </div>
                     </div>
            
                     <div className='flex justify-between mx-4 py-4'>
            
                         <div className=''>
                             {hasSalesTax &&
                                 <div>
                                     <table className='w-2/3'>
                                         <tbody>
                                             <tr>
                                                 <th className="px-4 py-2 my-auto font-bold bg-sky-400 border border-sky-800">Tax Type</th>
                                                 <th className="px-4 py-2 my-auto font-bold bg-sky-400 border border-sky-800">Rate</th>
                                                 <th className="px-4 py-2 my-auto font-bold bg-sky-400 border border-sky-800">Tax Amount</th>
                                             </tr>
                                             {salesData &&
                                                 salesData.rows &&
                                                 salesData.rows.map((row, index) => (
                                                     <React.Fragment key={index}>
                                                         <tr>
                                                             <td className="px-4 border-gray-600 border py-2">SGST</td>
                                                             <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                             <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                                         </tr>
                                                         <tr>
                                                             <td className="px-4 border-gray-600 border py-2">CGST</td>
                                                             <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                             <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                                         </tr>
                                                     </React.Fragment>
                                                 ))}
                                         </tbody>
            
                                     </table>
            
            
            
                                 </div>
                             }
            
                             <div className='text-sky-400 font-bold'>TOTAL PRICE IN WORDS</div>
                             <div className='text-black font-bold w-2/3'>{NumInWords(calculateTotalAmount())} Rupees Only</div>
                         </div>
            
                         {/* <div className='border rounded-lg  p-2  h-[28vh] '> */}
                         <div>
            
                             <table className='w-full max-w-xs overflow-x-auto '>
                                 <tbody className=''>
                                     <tr>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Total Qty</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{calculateTotalQty()}{ }</td>}
                                     </tr>
                                     <tr>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Sub Total</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.subTotal}₹</td>}
                                     </tr>
                                     {hasSalesTax && <tr >
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Total Tax</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalTax || 0}%</td>}
                                     </tr>}
                                     <tr>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Total Discount</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalDiscount || 0}%</td>}
                                     </tr>
                                     <tr className='bg-sky-300'>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Grand Total</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.grandTotal}₹</td>}
                                     </tr>
                                 </tbody>
                             </table>
            
                             <div className="flex items-center justify-center bg-gray-200 py-2 px-4 rounded font-bold">
                                 <span className="mr-2">Payment Status:</span>
                                 <span className="text-sky-600">{paymentStatus}</span>
                             </div>
            
            
            
                         </div>
            
            
                     </div>
            
                 </section>
             </div>
            </>
        );
    } else if (templateId === '3') {
        return (
            <>
            <div className='flex justify-end'>
                 <div className="bg-white hover:bg-black hover:text-white font-bold py-2 px-4 rounded">
                     <select className="bg-white hover:bg-black hover:text-white rounded" id="paymentStatus" value={paymentStatus} onChange={handleStatusChange}>
                         <option value="Pending">Pending</option>
                         <option value="Completed">Completed</option>
                         <option value="Cancelled">Cancelled</option>
                     </select>
                 </div>

                 <div ><SaveAsPDFButton /></div>


             </div>

             <div className='md:w-[45%] md:mx-auto'>
                 <section id="pdf-content" className='bg-white relative'>
                     <div className='mx-2 my-2 relative'>

                         <div className='bg-black w-7/12 py-5 rounded-r-full'>


                             {images && ImageDetails.length > 0 ? (
                                 <img
                                     alt='Company'
                                     className='w-2/12 ml-2 -mt-3 object-contain'
                                     style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                     src={`/${process.env.NEXT_PUBLIC_FOLDER}/${ImageDetails[0].url.slice(15)}`}
                                 />
                             ) : (
                                 <img
                                     alt='Company'
                                     className='w-2/12 ml-2 -mt-3 object-contain'
                                     style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                     src={'/90.png'}
                                 />
                             )
                             }


                             <div className='text-lg text-white font-bold ml-2 z-30 mt-1 md:text-2xl'>{companyDetails.length > 0 ? companyDetails[0].companyName.toUpperCase() : "Your Company Name"}</div>
                             <span className='text-xs text-white font-bold ml-2 block md:mt-1'>GSTIN: {companyDetails.length > 0 ? companyDetails[0].gstin.toUpperCase() : ""}</span>

                         </div>

                         <div className=' absolute top-16 right-6 font-bold text-lg md:text-2xl md:mt-5 md:mr-6'>
                             {hasSalesTax && "TAX"} INVOICE
                         </div>

                         <div className="bg-red-700 w-[78%] absolute right-0 top-0 rounded-bl-full py-5 md:py-6 overflow-x-auto">
                             <div className="flex justify-between items-center">
                                 <div className="flex items-center justify-center">
                                     <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                         <FiPhoneCall />
                                     </span>
                                     <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">{companyDetails.length > 0 ? companyDetails[0].companyPhone : "+91 99434XXXX"}</span>
                                 </div>
                                 <div className="flex items-center justify-center">
                                     <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                         <FiMail />
                                     </span>
                                     <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">{companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}</span>
                                 </div>
                                 <div className="flex items-center justify-center">
                                     <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                         <FiMapPin />
                                     </span>
                                     <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">location, {companyDetails.length > 0 ? companyDetails[0].companyCountry : "Country"},{companyDetails.length > 0 ? companyDetails[0].companyState : "State"}</span>
                                 </div>
                             </div>
                         </div>

                     </div>

                     <div className='mx-2 flex justify-between'>
                         <div className='py-4 px-2'>
                             <span className='text-red-600 font-semibold text-xl '>
                                 Bill To:
                             </span>
                             <div>
                                 <div>
                                     Jyothy Institute Of Technology
                                 </div>
                                 <div>
                                     {salesData && salesData.shippingCity}, {salesData && salesData.shippingState}
                                 </div>
                                 <div>
                                     +91 9035239238
                                 </div>
                                 {hasSalesTax && <div>
                                     <span className='text-md'>GSTIN: </span> 29AMWPD4772D1ZJ
                                 </div>}
                                 <div>
                                     {salesData && "State Code:" + salesData.shippingCode}
                                 </div>
                             </div>
                         </div>

                         <div className='py-4 px-2'>
                             <div >
                                 Date:{formattedDate}
                             </div>
                             <div>
                                 Invoice Number:{salesData && salesData._id.slice(-5).toUpperCase()}
                             </div>

                         </div>


                     </div>



                     <div className='mx-2'>
                         <div className="overflow-x-auto">
                             <table className="mx-auto">
                                 <thead className="bg-red-500">
                                     <tr className="">
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900 ">S No</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900">ITEM NAME</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900">QTY</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900">Price/Unit</th>
                                         {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TAX</th>}
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Discount</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Amount</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {salesData && salesData.rows && salesData.rows.map((row, index) => (
                                         <tr key={index} className="">
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{index + 1}</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.prodName}</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.qty}</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.price || 0}₹</td>
                                             {hasSalesTax && <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.tax && row.tax || 0}%</td>}
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.discount || 0}%</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.total}₹</td>
                                         </tr>
                                     ))}
                                 </tbody>

                                 <tfoot className="bg-red-500 ">
                                     <tr className="text-center">
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800"></th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TOTAL</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalQty()}</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalPrice() + "₹"}</th>
                                         {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalTax() + "%"}</th>}
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalDiscount()}%</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalAmount()}₹</th>
                                     </tr>
                                 </tfoot>
                             </table>
                         </div>
                     </div>

                     <div className='flex justify-between mx-4 py-4'>

                         <div className=''>
                             {hasSalesTax &&
                                 <div>
                                     <table className='w-2/3'>
                                         <tbody>
                                             <tr>
                                                 <th className="px-4 py-2 my-auto font-bold bg-red-400 border border-red-800">Tax Type</th>
                                                 <th className="px-4 py-2 my-auto font-bold bg-red-400 border border-red-800">Rate</th>
                                                 <th className="px-4 py-2 my-auto font-bold bg-red-400 border border-red-800">Tax Amount</th>
                                             </tr>
                                             {salesData &&
                                                 salesData.rows &&
                                                 salesData.rows.map((row, index) => (
                                                     <React.Fragment key={index}>
                                                         <tr>
                                                             <td className="px-4 border-gray-600 border py-2">SGST</td>
                                                             <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                             <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                                         </tr>
                                                         <tr>
                                                             <td className="px-4 border-gray-600 border py-2">CGST</td>
                                                             <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                             <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                                         </tr>
                                                     </React.Fragment>
                                                 ))}
                                         </tbody>

                                     </table>



                                 </div>
                             }

                             <div className='text-red-400 font-bold'>TOTAL PRICE IN WORDS</div>
                             <div className='text-black font-bold w-2/3'>{NumInWords(calculateTotalAmount())} Rupees Only</div>
                         </div>

                         {/* <div className='border rounded-lg  p-2  h-[28vh] '> */}
                         <div>

                             <table className='w-full max-w-xs overflow-x-auto '>
                                 <tbody className=''>
                                     <tr>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Total Qty</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{calculateTotalQty()}{ }</td>}
                                     </tr>
                                     <tr>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Sub Total</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.subTotal}₹</td>}
                                     </tr>
                                     {hasSalesTax && <tr >
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Total Tax</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalTax || 0}%</td>}
                                     </tr>}
                                     <tr>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Total Discount</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalDiscount || 0}%</td>}
                                     </tr>
                                     <tr className='bg-red-300'>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Grand Total</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.grandTotal}₹</td>}
                                     </tr>
                                 </tbody>
                             </table>

                             <div className="flex items-center justify-center bg-gray-200 py-2 px-4 rounded font-bold">
                                 <span className="mr-2">Payment Status:</span>
                                 <span className="text-red-600">{paymentStatus}</span>
                             </div>



                         </div>


                     </div>

                 </section>
             </div>
         </>
        );
    }else if (templateId === '4') {
        return (
            <>
            <div className='flex justify-end'>
                 <div className="bg-white hover:bg-black hover:text-black font-bold py-2 px-4 rounded">
                     <select className="bg-white hover:bg-black hover:text-black rounded" id="paymentStatus" value={paymentStatus} onChange={handleStatusChange}>
                         <option value="Pending">Pending</option>
                         <option value="Completed">Completed</option>
                         <option value="Cancelled">Cancelled</option>
                     </select>
                 </div>
            
                 <div ><SaveAsPDFButton /></div>
            
            
             </div>
            
             <div className='md:w-[45%] md:mx-auto'>
                 <section id="pdf-content" className='bg-white relative'>
                     <div className='mx-2 my-2 relative'>
            
                         <div className=' py-5 flex justify-between'>
            
                         
            
            
                             <div className="flex justify-around mr-10 font-bold text-md">
                                 <div className="flex items-center justify-center">
                                     <span className="ml-2 border-r-2 border-white px-1 text-black">
                                         <FiPhoneCall />
                                     </span>
                                     <span className="ml-1 text-black text-xs whitespace-nowrap -mt-4 ">{companyDetails.length > 0 ? companyDetails[0].companyPhone : "+91 99434XXXX"}</span>
                                 </div>
                                 <div className="flex items-center justify-center">
                                     <span className="ml-2 border-r-2 border-white px-1 text-black">
                                         <FiMail />
                                     </span>
                                     <span className="ml-1 text-black text-xs whitespace-nowrap -mt-4 "><a target='_blank' href={`mailto:${companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}`}>{companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}</a></span>
                                 </div>
                                 <div className="flex items-center justify-center">
                                     <span className="ml-2 border-r-2 border-white px-1 text-black">
                                         <FiMapPin />
                                     </span>
                                     <span className="ml-1 text-black whitespace-nowrap -mt-4 text-sm">location, {companyDetails.length > 0 ? companyDetails[0].companyCountry : "Country"},{companyDetails.length > 0 ? companyDetails[0].companyState : "State"}</span>
                                 </div>
                             </div>
            
                             <div className='flex justify-end flex-col ml-10
                            '>
            
            
            {images && ImageDetails.length > 0 ? (
                <img
                    alt='Company'
                    className='w-32 object-contain rounded-full '
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    src={`/${process.env.NEXT_PUBLIC_FOLDER}/${ImageDetails[0].url.slice(15)}`}
                />
                ) : (
                <img
                    alt='Company'
                    className='w-2/12 ml-2 -mt-3 object-contain'
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    src={'/90.png'}
                />
            )
            }
            
            
            <div className='text-lg text-black font-bold z-30 -mt-3 md:text-md'>{companyDetails.length > 0 ? companyDetails[0].companyName.toUpperCase() : "Your Company Name"}</div>
            <span className='text-xs text-black font-bold block md:mt-1'>GSTIN: {companyDetails.length > 0 ? companyDetails[0].gstin.toUpperCase() : ""}</span>
            
            
            
                </div>
                         
                         </div>
            
                        
            
                         
                             
            
                     </div>
                     <div className='font-bold text-lg md:text-xl md:mt-5 md:mr-6 flex justify-center text-red-500'>
                             {hasSalesTax && "TAX"} INVOICE
                         </div>
            
                     <div className='mx-2 flex justify-between'>
                         <div className='py-4 px-2'>
                             <span className='text-black font-semibold text-xl '>
                                 Bill To:
                             </span>
                             <div>
                                 <div>
                                     Jyothy Institute Of Technology
                                 </div>
                                 <div>
                                     {salesData && salesData.shippingCity}, {salesData && salesData.shippingState}
                                 </div>
                                 <div>
                                     +91 9035239238
                                 </div>
                                 {hasSalesTax && <div>
                                     <span className='text-md'>GSTIN: </span> 29AMWPD4772D1ZJ
                                 </div>}
                                 <div>
                                     {salesData && "State Code:" + salesData.shippingCode}
                                 </div>
                             </div>
                         </div>
            
                         <div className='py-4 px-2'>
                             <div >
                                 Date:{formattedDate}
                             </div>
                             <div>
                                 Invoice Number:{salesData && salesData._id.slice(-5).toUpperCase()}
                             </div>
            
                         </div>
            
            
                     </div>
            
            
            
                     <div className='mx-2'>
                         <div className="overflow-x-auto">
                             <table className="mx-auto">
                                 <thead className="bg-red-500">
                                     <tr className="">
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900 ">S No</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900">ITEM NAME</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900">QTY</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900">Price/Unit</th>
                                         {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TAX</th>}
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Discount</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Amount</th>
                                     </tr>
                                 </thead>
                                 <tbody>
                                     {salesData && salesData.rows && salesData.rows.map((row, index) => (
                                         <tr key={index} className="">
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{index + 1}</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.prodName}</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.qty}</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.price || 0}₹</td>
                                             {hasSalesTax && <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.tax && row.tax || 0}%</td>}
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.discount || 0}%</td>
                                             <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.total}₹</td>
                                         </tr>
                                     ))}
                                 </tbody>
            
                                 <tfoot className="">
                                     <tr className="text-center">
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800"></th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TOTAL</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalQty()}</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalPrice() + "₹"}</th>
                                         {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalTax() + "%"}</th>}
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalDiscount()}%</th>
                                         <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalAmount()}₹</th>
                                     </tr>
                                 </tfoot>
                             </table>
                         </div>
                     </div>
            
                     <div className='flex justify-between mx-4 py-4'>
            
                         <div className=''>
                             {hasSalesTax &&
                                 <div>
                                     <table className='w-2/3'>
                                         <tbody>
                                             <tr>
                                                 <th className="px-4 py-2 my-auto font-bold bg-red-400 border border-red-800">Tax Type</th>
                                                 <th className="px-4 py-2 my-auto font-bold bg-red-400 border border-red-800">Rate</th>
                                                 <th className="px-4 py-2 my-auto font-bold bg-red-400 border border-red-800">Tax Amount</th>
                                             </tr>
                                             {salesData &&
                                                 salesData.rows &&
                                                 salesData.rows.map((row, index) => (
                                                     <React.Fragment key={index}>
                                                         <tr>
                                                             <td className="px-4 border-gray-600 border py-2">SGST</td>
                                                             <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                             <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                                         </tr>
                                                         <tr>
                                                             <td className="px-4 border-gray-600 border py-2">CGST</td>
                                                             <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                             <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                                         </tr>
                                                     </React.Fragment>
                                                 ))}
                                         </tbody>
            
                                     </table>
            
            
            
                                 </div>
                             }
            
                             <div className='text-black font-bold'>TOTAL PRICE IN WORDS</div>
                             <div className='text-black font-bold w-2/3'>{NumInWords(calculateTotalAmount())} Rupees Only</div>
                         </div>
            
                         {/* <div className='border rounded-lg  p-2  h-[28vh] '> */}
                         <div>
            
                             <table className='w-full max-w-xs overflow-x-auto '>
                                 <tbody className=''>
                                     <tr>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Total Qty</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{calculateTotalQty()}{ }</td>}
                                     </tr>
                                     <tr>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Sub Total</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.subTotal}₹</td>}
                                     </tr>
                                     {hasSalesTax && <tr >
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Total Tax</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalTax || 0}%</td>}
                                     </tr>}
                                     <tr>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Total Discount</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalDiscount || 0}%</td>}
                                     </tr>
                                     <tr className='bg-red-300'>
                                         <td className="px-4 border-gray-600 border py-2 my-auto">Grand Total</td>
                                         {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.grandTotal}₹</td>}
                                     </tr>
                                 </tbody>
                             </table>
            
                             <div className="flex items-center justify-center bg-gray-200 py-2 px-4 rounded font-bold">
                                 <span className="mr-2">Payment Status:</span>
                                 <span className="text-red-600">{paymentStatus}</span>
                             </div>
            
            
            
                         </div>
            
            
                     </div>
            
                 </section>
             </div>
            </>
        )
    }else if (templateId === '5') {
        return (
<>
<div className='flex justify-end'>
     <div className="bg-white hover:bg-black hover:text-black font-bold py-2 px-4 rounded">
         <select className="bg-white hover:bg-black hover:text-black rounded" id="paymentStatus" value={paymentStatus} onChange={handleStatusChange}>
             <option value="Pending">Pending</option>
             <option value="Completed">Completed</option>
             <option value="Cancelled">Cancelled</option>
         </select>
     </div>

     <div ><SaveAsPDFButton /></div>


 </div>

 <div className='md:w-[45%] md:mx-auto'>
     <section id="pdf-content" className='bg-white relative'>
         <div className='mx-2 my-2 relative'>

             <div className=' py-5 flex justify-between'>

             


                 <div className="flex justify-around mr-10 font-bold text-md">
                     <div className="flex items-center justify-center">
                         <span className="ml-2 border-r-2 border-white px-1 text-black">
                             <FiPhoneCall />
                         </span>
                         <span className="ml-1 text-black text-xs whitespace-nowrap -mt-4 ">{companyDetails.length > 0 ? companyDetails[0].companyPhone : "+91 99434XXXX"}</span>
                     </div>
                     <div className="flex items-center justify-center">
                         <span className="ml-2 border-r-2 border-white px-1 text-black">
                             <FiMail />
                         </span>
                         <span className="ml-1 text-black text-xs whitespace-nowrap -mt-4 "><a target='_blank' href={`mailto:${companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}`}>{companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}</a></span>
                     </div>
                     <div className="flex items-center justify-center">
                         <span className="ml-2 border-r-2 border-white px-1 text-black">
                             <FiMapPin />
                         </span>
                         <span className="ml-1 text-black whitespace-nowrap -mt-4 text-sm">location, {companyDetails.length > 0 ? companyDetails[0].companyCountry : "Country"},{companyDetails.length > 0 ? companyDetails[0].companyState : "State"}</span>
                     </div>
                 </div>

                 <div className='flex justify-end flex-col ml-10
                '>


{images && ImageDetails.length > 0 ? (
    <img
        alt='Company'
        className='w-32 object-contain rounded-full '
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        src={`/${process.env.NEXT_PUBLIC_FOLDER}/${ImageDetails[0].url.slice(15)}`}
    />
    ) : (
    <img
        alt='Company'
        className='w-2/12 ml-2 -mt-3 object-contain'
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
        src={'/90.png'}
    />
)
}


<div className='text-lg text-black font-bold z-30 -mt-3 md:text-md'>{companyDetails.length > 0 ? companyDetails[0].companyName.toUpperCase() : "Your Company Name"}</div>
<span className='text-xs text-black font-bold block md:mt-1'>GSTIN: {companyDetails.length > 0 ? companyDetails[0].gstin.toUpperCase() : ""}</span>



    </div>
             
             </div>

            

             
                 

         </div>
         <div className='font-bold text-lg md:text-xl md:mt-5 md:mr-6 flex justify-center text-sky-500'>
                 {hasSalesTax && "TAX"} INVOICE
             </div>

         <div className='mx-2 flex justify-between'>
             <div className='py-4 px-2'>
                 <span className='text-black font-semibold text-xl '>
                     Bill To:
                 </span>
                 <div>
                     <div>
                         Jyothy Institute Of Technology
                     </div>
                     <div>
                         {salesData && salesData.shippingCity}, {salesData && salesData.shippingState}
                     </div>
                     <div>
                         +91 9035239238
                     </div>
                     {hasSalesTax && <div>
                         <span className='text-md'>GSTIN: </span> 29AMWPD4772D1ZJ
                     </div>}
                     <div>
                         {salesData && "State Code:" + salesData.shippingCode}
                     </div>
                 </div>
             </div>

             <div className='py-4 px-2'>
                 <div >
                     Date:{formattedDate}
                 </div>
                 <div>
                     Invoice Number:{salesData && salesData._id.slice(-5).toUpperCase()}
                 </div>

             </div>


         </div>



         <div className='mx-2'>
             <div className="overflow-x-auto">
                 <table className="mx-auto">
                     <thead className="bg-sky-500">
                         <tr className="">
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-900 ">S No</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-900">ITEM NAME</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-900">QTY</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-900">Price/Unit</th>
                             {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">TAX</th>}
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">Discount</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">Amount</th>
                         </tr>
                     </thead>
                     <tbody>
                         {salesData && salesData.rows && salesData.rows.map((row, index) => (
                             <tr key={index} className="">
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{index + 1}</td>
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.prodName}</td>
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.qty}</td>
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.price || 0}₹</td>
                                 {hasSalesTax && <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.tax && row.tax || 0}%</td>}
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.discount || 0}%</td>
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{row.total}₹</td>
                             </tr>
                         ))}
                     </tbody>

                     <tfoot className="">
                         <tr className="text-center">
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800"></th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">TOTAL</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalQty()}</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalPrice() + "₹"}</th>
                             {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalTax() + "%"}</th>}
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalDiscount()}%</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-sky-800">{calculateTotalAmount()}₹</th>
                         </tr>
                     </tfoot>
                 </table>
             </div>
         </div>

         <div className='flex justify-between mx-4 py-4'>

             <div className=''>
                 {hasSalesTax &&
                     <div>
                         <table className='w-2/3'>
                             <tbody>
                                 <tr>
                                     <th className="px-4 py-2 my-auto font-bold bg-sky-400 border border-sky-800">Tax Type</th>
                                     <th className="px-4 py-2 my-auto font-bold bg-sky-400 border border-sky-800">Rate</th>
                                     <th className="px-4 py-2 my-auto font-bold bg-sky-400 border border-sky-800">Tax Amount</th>
                                 </tr>
                                 {salesData &&
                                     salesData.rows &&
                                     salesData.rows.map((row, index) => (
                                         <React.Fragment key={index}>
                                             <tr>
                                                 <td className="px-4 border-gray-600 border py-2">SGST</td>
                                                 <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                 <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                             </tr>
                                             <tr>
                                                 <td className="px-4 border-gray-600 border py-2">CGST</td>
                                                 <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                 <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                             </tr>
                                         </React.Fragment>
                                     ))}
                             </tbody>

                         </table>



                     </div>
                 }

                 <div className='text-black font-bold'>TOTAL PRICE IN WORDS</div>
                 <div className='text-black font-bold w-2/3'>{NumInWords(calculateTotalAmount())} Rupees Only</div>
             </div>

             {/* <div className='border rounded-lg  p-2  h-[28vh] '> */}
             <div>

                 <table className='w-full max-w-xs overflow-x-auto '>
                     <tbody className=''>
                         <tr>
                             <td className="px-4 border-gray-600 border py-2 my-auto">Total Qty</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{calculateTotalQty()}{ }</td>}
                         </tr>
                         <tr>
                             <td className="px-4 border-gray-600 border py-2 my-auto">Sub Total</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.subTotal}₹</td>}
                         </tr>
                         {hasSalesTax && <tr >
                             <td className="px-4 border-gray-600 border py-2 my-auto">Total Tax</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalTax || 0}%</td>}
                         </tr>}
                         <tr>
                             <td className="px-4 border-gray-600 border py-2 my-auto">Total Discount</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalDiscount || 0}%</td>}
                         </tr>
                         <tr className='bg-sky-300'>
                             <td className="px-4 border-gray-600 border py-2 my-auto">Grand Total</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.grandTotal}₹</td>}
                         </tr>
                     </tbody>
                 </table>

                 <div className="flex items-center justify-center bg-gray-200 py-2 px-4 rounded font-bold">
                     <span className="mr-2">Payment Status:</span>
                     <span className="text-sky-600">{paymentStatus}</span>
                 </div>



             </div>


         </div>

     </section>
 </div>
</>
        )
    }
    
    else if (templateId === '6') {
        return (
            <>
<div className='flex justify-end'>
     <div className="bg-white hover:bg-black hover:text-white font-bold py-2 px-4 rounded">
         <select className="bg-white hover:bg-black hover:text-white rounded" id="paymentStatus" value={paymentStatus} onChange={handleStatusChange}>
             <option value="Pending">Pending</option>
             <option value="Completed">Completed</option>
             <option value="Cancelled">Cancelled</option>
         </select>
     </div>

     <div ><SaveAsPDFButton /></div>


 </div>

 <div className='md:w-[45%] md:mx-auto'>
     <section id="pdf-content" className='bg-white relative'>
         <div className='mx-2 my-2 relative'>

             <div className=' py-5 bg-red-700 flex'>

             <div>


                 {images && ImageDetails.length > 0 ? (
                     <img
                         alt='Company'
                         className='w-2/12 ml-2 -mt-3 object-contain rounded-full '
                         style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                         src={`/${process.env.NEXT_PUBLIC_FOLDER}/${ImageDetails[0].url.slice(15)}`}
                     />
                     ) : (
                     <img
                         alt='Company'
                         className='w-2/12 ml-2 -mt-3 object-contain'
                         style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                         src={'/90.png'}
                     />
                 )
                 }


                 <div className='text-lg text-white font-bold ml-2 z-30 mt-1 md:text-2xl'>{companyDetails.length > 0 ? companyDetails[0].companyName.toUpperCase() : "Your Company Name"}</div>
                 <span className='text-xs text-white font-bold ml-2 block md:mt-1'>GSTIN: {companyDetails.length > 0 ? companyDetails[0].gstin.toUpperCase() : ""}</span>



                     </div>


                 <div className="flex justify-around mr-10 font-bold text-md">
                     <div className="flex items-center justify-center">
                         <span className="ml-2 border-r-2 border-white px-1 text-white">
                             <FiPhoneCall />
                         </span>
                         <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">{companyDetails.length > 0 ? companyDetails[0].companyPhone : "+91 99434XXXX"}</span>
                     </div>
                     <div className="flex items-center justify-center">
                         <span className="ml-2 border-r-2 border-white px-1 text-white">
                             <FiMail />
                         </span>
                         <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 "><a target='_blank' href={`mailto:${companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}`}>{companyDetails.length > 0 ? companyDetails[0].companyEmail : "John@mail.com"}</a></span>
                     </div>
                     <div className="flex items-center justify-center">
                         <span className="ml-2 border-r-2 border-white px-1 text-white">
                             <FiMapPin />
                         </span>
                         <span className="ml-1 text-white whitespace-nowrap -mt-4 text-sm">location, {companyDetails.length > 0 ? companyDetails[0].companyCountry : "Country"},{companyDetails.length > 0 ? companyDetails[0].companyState : "State"}</span>
                     </div>
                 </div>


             
             </div>

            

             
                 

         </div>
         <div className='font-bold text-lg md:text-xl md:mt-5 md:mr-6 flex justify-center text-red-500'>
                 {hasSalesTax && "TAX"} INVOICE
             </div>

         <div className='mx-2 flex justify-between'>
             <div className='py-4 px-2'>
                 <span className='text-red-600 font-semibold text-xl '>
                     Bill To:
                 </span>
                 <div>
                     <div>
                         Jyothy Institute Of Technology
                     </div>
                     <div>
                         {salesData && salesData.shippingCity}, {salesData && salesData.shippingState}
                     </div>
                     <div>
                         +91 9035239238
                     </div>
                     {hasSalesTax && <div>
                         <span className='text-md'>GSTIN: </span> 29AMWPD4772D1ZJ
                     </div>}
                     <div>
                         {salesData && "State Code:" + salesData.shippingCode}
                     </div>
                 </div>
             </div>

             <div className='py-4 px-2'>
                 <div >
                     Date:{formattedDate}
                 </div>
                 <div>
                     Invoice Number:{salesData && salesData._id.slice(-5).toUpperCase()}
                 </div>

             </div>


         </div>



         <div className='mx-2'>
             <div className="overflow-x-auto">
                 <table className="mx-auto">
                     <thead className="bg-red-500">
                         <tr className="">
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900 ">S No</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900">ITEM NAME</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900">QTY</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-900">Price/Unit</th>
                             {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TAX</th>}
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Discount</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Amount</th>
                         </tr>
                     </thead>
                     <tbody>
                         {salesData && salesData.rows && salesData.rows.map((row, index) => (
                             <tr key={index} className="">
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{index + 1}</td>
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.prodName}</td>
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.qty}</td>
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.price || 0}₹</td>
                                 {hasSalesTax && <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.tax && row.tax || 0}%</td>}
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.discount || 0}%</td>
                                 <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{row.total}₹</td>
                             </tr>
                         ))}
                     </tbody>

                     <tfoot className="">
                         <tr className="text-center">
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800"></th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TOTAL</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalQty()}</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalPrice() + "₹"}</th>
                             {hasSalesTax && <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalTax() + "%"}</th>}
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalDiscount()}%</th>
                             <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">{calculateTotalAmount()}₹</th>
                         </tr>
                     </tfoot>
                 </table>
             </div>
         </div>

         <div className='flex justify-between mx-4 py-4'>

             <div className=''>
                 {hasSalesTax &&
                     <div>
                         <table className='w-2/3'>
                             <tbody>
                                 <tr>
                                     <th className="px-4 py-2 my-auto font-bold bg-red-400 border border-red-800">Tax Type</th>
                                     <th className="px-4 py-2 my-auto font-bold bg-red-400 border border-red-800">Rate</th>
                                     <th className="px-4 py-2 my-auto font-bold bg-red-400 border border-red-800">Tax Amount</th>
                                 </tr>
                                 {salesData &&
                                     salesData.rows &&
                                     salesData.rows.map((row, index) => (
                                         <React.Fragment key={index}>
                                             <tr>
                                                 <td className="px-4 border-gray-600 border py-2">SGST</td>
                                                 <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                 <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                             </tr>
                                             <tr>
                                                 <td className="px-4 border-gray-600 border py-2">CGST</td>
                                                 <td className="px-4 border-gray-600 border py-2">{row.tax / 2 || 0}%</td>
                                                 <td className="px-4 border-gray-600 border py-2">{(row.total * (row.tax || 0)) / 100}₹</td>
                                             </tr>
                                         </React.Fragment>
                                     ))}
                             </tbody>

                         </table>



                     </div>
                 }

                 <div className='text-red-400 font-bold'>TOTAL PRICE IN WORDS</div>
                 <div className='text-black font-bold w-2/3'>{NumInWords(calculateTotalAmount())} Rupees Only</div>
             </div>

             {/* <div className='border rounded-lg  p-2  h-[28vh] '> */}
             <div>

                 <table className='w-full max-w-xs overflow-x-auto '>
                     <tbody className=''>
                         <tr>
                             <td className="px-4 border-gray-600 border py-2 my-auto">Total Qty</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{calculateTotalQty()}{ }</td>}
                         </tr>
                         <tr>
                             <td className="px-4 border-gray-600 border py-2 my-auto">Sub Total</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.subTotal}₹</td>}
                         </tr>
                         {hasSalesTax && <tr >
                             <td className="px-4 border-gray-600 border py-2 my-auto">Total Tax</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalTax || 0}%</td>}
                         </tr>}
                         <tr>
                             <td className="px-4 border-gray-600 border py-2 my-auto">Total Discount</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.totalDiscount || 0}%</td>}
                         </tr>
                         <tr className='bg-red-300'>
                             <td className="px-4 border-gray-600 border py-2 my-auto">Grand Total</td>
                             {salesData && <td className="px-4 border-gray-600 border py-2 my-auto">{salesData.grandTotal}₹</td>}
                         </tr>
                     </tbody>
                 </table>

                 <div className="flex items-center justify-center bg-gray-200 py-2 px-4 rounded font-bold">
                     <span className="mr-2">Payment Status:</span>
                     <span className="text-red-600">{paymentStatus}</span>
                 </div>



             </div>


         </div>

     </section>
 </div>
</>
    
            );
    }

    // Handle cases where the templateId does not match any known templates
    return <div>Unknown Template</div>;
};

export default TemplatePage;


export async function getServerSideProps(context) {
    try {
        await connectDB();

        const images = await Images.find({})
        const companyDetails = await Company.find({}, { updatedAt: 0 }).lean();



        const imageDetails = images.map((item) => ({
            _id: item.id,
            url: item.url,
            author: (item.author) ? (JSON.stringify(item.author).slice(1, -1)) : "",
        }));
        const company = companyDetails.map((item) => ({
            ...item,
            _id: item._id ? String(item._id) : '',
            author: item.author ? String(item.author) : '',
            createdAt: item.createdAt ? item.createdAt.toISOString() : '',
        }))

        return {
            props: {
                images: imageDetails,
                company: company,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: { images: [], company: [] },
        };
    }
}


