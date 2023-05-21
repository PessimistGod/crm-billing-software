import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi';
import Images from '@/Models/Image'
import connectDB from '@/Middleware/db';
import jwt_decode from 'jwt-decode';
import SaveAsPDFButton from '@/Components/saveAsPdf'


const TemplatePage = ({ images }) => {
    const router = useRouter();
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
    console.log(images.map(item => (item.author === registration) ? <Image width={2} height={2} className='' src={`/${item.url.slice(7)}`} /> : null));

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

    console.log(NumInWords(89754697976431))


    const { templateId } = router.query;

    if (templateId === '1') {
        const { id } = router.query;
        const uid = id

        return (
            <>
            <div><SaveAsPDFButton /></div>
            <div className='md:w-[45%] md:mx-auto'>
                <section id="pdf-content" className='bg-white'>
                    <div className='mx-2 my-2 relative'>

                        <div className='bg-black w-7/12 py-5 rounded-r-full'>
                            {images.map(item => (item.author === registration) ? <Image key={item._id} width={300} height={350} alt='Company' className='w-2/12 aspect-square ml-2 -mt-3 object-contain' src={`/${process.env.NEXT_PUBLIC_FOLDER}/${item.url.slice(15)}`} /> : <Image key={item._id} width={300} alt='Company' height={350} className='md:w-16 w-12 md:mx-5 m-1 md:-mt-9 p-1 bg-white aspect-square' src={'/90.png'} />)}

                            <div className='text-lg text-white font-bold ml-2 z-30 mt-1 md:text-2xl'>Company Name Here</div>
                            <span className='text-xs text-white font-bold ml-2 block md:mt-1'>Company Name Here</span>

                        </div>

                        <div className=' absolute top-16 right-6 font-bold text-lg md:text-2xl md:mt-5 md:mr-6'>
                            TAX INVOICE
                        </div>

                        <div className="bg-blue-500 w-[78%] absolute right-0 top-0 rounded-bl-full py-5 md:py-6 overflow-x-auto">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center justify-center">
                                    <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                        <FiPhoneCall />
                                    </span>
                                    <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">+91 94754954534</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                        <FiMail />
                                    </span>
                                    <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">Email@mail.com</span>
                                </div>
                                <div className="flex items-center justify-center">
                                    <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                        <FiMapPin />
                                    </span>
                                    <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">location, India Bangalore</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='mx-2 flex justify-between'>
                        <div className='py-4 px-2'>
                            <span className='text-blue-600 font-semibold text-xl '>
                                Bill To:
                            </span>
                            <div>
                                <div>
                                    Name:ghjnhgh
                                </div>
                                <div>
                                    Address:ghjnhgh
                                </div>
                                <div>
                                    Phone:ghjnhgh
                                </div>
                                <div>
                                    GSTIN:ghjnhgh
                                </div>
                                <div>
                                    State Code:ghjnhgh
                                </div>
                            </div>
                        </div>

                        <div className='py-4 px-2'>
                            <div >
                                Date:22 may 2023
                            </div>
                            <div>
                                Invoice Number:1234
                            </div>

                        </div>


                    </div>



                    <div className='mx-2'>
                        <div className="overflow-x-auto">
                            <table className="mx-auto">
                                <thead className="bg-blue-400">
                                    <tr className="">
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800 ">S No</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">ITEM NAME</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">QTY</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">Price/Unit</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">TAX</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">Discount</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                        <td className="px-6 py-2 text-center whitespace-nowrap border border-blue-800 ">S No</td>
                                        <td className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">JUPITER INSIDE </td>
                                        <td className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">QTY</td>
                                        <td className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">100000</td>
                                        <td className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">TAX</td>
                                        <td className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">Discount</td>
                                        <td className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">200000000</td>
                                    </tr>
                                </tbody>
                                <tfoot className="bg-blue-300 ">
                                    <tr className="text-center">
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800"></th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">TOTAL</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">QTY</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">Price/Unit</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">TAX</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">Discount</th>
                                        <th className="px-6 py-2 text-center whitespace-nowrap border border-blue-800">Amount</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    <div className='flex justify-between mx-4 py-4'>

                        <div className=''>
                            <div className='text-blue-400 font-bold'>TOTAL PRICE IN WORDS</div>
                            <div className='text-black font-bold w-1/2'>{NumInWords(1233443)} Rupees Only</div>
                        </div>

                        <div className='border rounded-lg border-black p-2 w-2/5 overflow-x-auto'>

                            <table className='w-full'>
                                <tbody className='w-full'>
                                    <tr>
                                        <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                        <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                        <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                    </tr>
                                    <tr >
                                        <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                        <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                        <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                    </tr>
                                    <tr className='bg-blue-300'>
                                        <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                        <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>




                </section>
            </div>
        </>
        );
    } else if (templateId === '2') {
        return (
            <section>
                <div>this is 2nd template</div>
            </section>
        );
    } else if (templateId === '3') {
        return (
            <>
                <div><SaveAsPDFButton /></div>
                <div className='md:w-[45%] md:mx-auto'>
                    <section id="pdf-content" className='bg-white'>
                        <div className='mx-2 my-2 relative'>

                            <div className='bg-black w-7/12 py-5 rounded-r-full'>
                                {images.map(item => (item.author === registration) ? <Image key={item._id} width={300} height={350} alt='Company' className='w-2/12 aspect-square ml-2 -mt-3 object-contain' src={`/${process.env.NEXT_PUBLIC_FOLDER}/${item.url.slice(15)}`} /> : <Image key={item._id} width={300} alt='Company' height={350} className='md:w-16 w-12 md:mx-5 m-1 md:-mt-9 p-1 bg-white aspect-square' src={'/90.png'} />)}

                                <div className='text-lg text-white font-bold ml-2 z-30 mt-1 md:text-2xl'>Company Name Here</div>
                                <span className='text-xs text-white font-bold ml-2 block md:mt-1'>Company Name Here</span>

                            </div>

                            <div className=' absolute top-16 right-6 font-bold text-lg md:text-2xl md:mt-5 md:mr-6'>
                                TAX INVOICE
                            </div>

                            <div className="bg-red-500 w-[78%] absolute right-0 top-0 rounded-bl-full py-5 md:py-6 overflow-x-auto">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center justify-center">
                                        <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                            <FiPhoneCall />
                                        </span>
                                        <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">+91 94754954534</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                            <FiMail />
                                        </span>
                                        <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">Email@mail.com</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <span className="ml-2 border-r-2 border-white px-1 text-sm text-white">
                                            <FiMapPin />
                                        </span>
                                        <span className="ml-1 text-white text-xs whitespace-nowrap -mt-4 ">location, India Bangalore</span>
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
                                        Name:ghjnhgh
                                    </div>
                                    <div>
                                        Address:ghjnhgh
                                    </div>
                                    <div>
                                        Phone:ghjnhgh
                                    </div>
                                    <div>
                                        GSTIN:ghjnhgh
                                    </div>
                                    <div>
                                        State Code:ghjnhgh
                                    </div>
                                </div>
                            </div>

                            <div className='py-4 px-2'>
                                <div >
                                    Date:22 may 2023
                                </div>
                                <div>
                                    Invoice Number:1234
                                </div>

                            </div>


                        </div>



                        <div className='mx-2'>
                            <div className="overflow-x-auto">
                                <table className="mx-auto">
                                    <thead className="bg-red-400">
                                        <tr className="">
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800 ">S No</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">ITEM NAME</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">QTY</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Price/Unit</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TAX</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Discount</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="">
                                            <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800 ">S No</td>
                                            <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">JUPITER INSIDE </td>
                                            <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">QTY</td>
                                            <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">100000</td>
                                            <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TAX</td>
                                            <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Discount</td>
                                            <td className="px-6 py-2 text-center whitespace-nowrap border border-red-800">200000000</td>
                                        </tr>
                                    </tbody>
                                    <tfoot className="bg-red-300 ">
                                        <tr className="text-center">
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800"></th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TOTAL</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">QTY</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Price/Unit</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">TAX</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Discount</th>
                                            <th className="px-6 py-2 text-center whitespace-nowrap border border-red-800">Amount</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>

                        <div className='flex justify-between mx-4 py-4'>

                            <div className=''>
                                <div className='text-red-400 font-bold'>TOTAL PRICE IN WORDS</div>
                                <div className='text-black font-bold w-1/2'>{NumInWords(1233443)} Rupees Only</div>
                            </div>

                            <div className='border rounded-lg border-black p-2 w-2/5 overflow-x-auto'>

                                <table className='w-full'>
                                    <tbody className='w-full'>
                                        <tr>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                        </tr>
                                        <tr >
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                        </tr>
                                        <tr className='bg-red-300'>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">Discount</td>
                                            <td className="px-4 border-gray-600 border py-2 my-auto">10%</td>
                                        </tr>
                                    </tbody>
                                </table>

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


        const imageDetails = images.map((item) => ({
            _id: item.id,
            url: item.url,
            author: (item.author) ? (JSON.stringify(item.author).slice(1, -1)) : "",
        }));

        return {
            props: {
                images: imageDetails,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: { images: [] },
        };
    }
}