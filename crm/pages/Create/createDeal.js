import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Company from "@/Models/createCompany";
import connectDB from '@/Middleware/db';
import { useRouter } from 'next/router';


const createDeal = ({companies}) => {
    const [registration, setRegistration] = useState("")
    const router = useRouter()

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwt_decode(token);
                if (decodedToken) {
                    setRegistration(decodedToken.id);
                } else {
                    setRegistration("");
                }
            }
        } catch (error) {
            console.log(error);
            setRegistration("");
        }

    }, [])
//  console.log(companies.find(author => author.author === registration))


    let companyDetails = companies.find(author => author.author === registration)

    const [dealOwner, setDealOwner] = useState("")
    const [dealName, setDealName] = useState("")
    const [amount, setAmount] = useState("")
    const [closingDate, setClosingDate] = useState("")
    const [accountName, setAccountName] = useState("")
    const [type, setType] = useState("")
    const [expectedRevenue, setExpectedRevenue] = useState("")
    const [leadSource, setLeadSource] = useState("")
    const [campaignSource, setCampaignSource] = useState("")
    const [contactName, setContactName] = useState("")
    const [description, setDescription] = useState("")
   




    
    const handleChange = (e) => {
        if (e.target.name == 'dealOwner') {
            setDealOwner(e.target.value)
        }
        if (e.target.name == 'dealName') {
            setDealName(e.target.value)
        }
        if (e.target.name == 'amount') {
            setAmount(e.target.value)
        }
        if (e.target.name == 'closingDate') {
            setClosingDate(e.target.value)
        }
        if (e.target.name == 'accountName') {
            setAccountName(e.target.value)
        }
        if (e.target.name == 'type') {
            setType(e.target.value)
        }
        if (e.target.name == 'expectedRevenue') {
            setExpectedRevenue(e.target.value)
        }
        if (e.target.name == 'leadSource') {
            setLeadSource(e.target.value)
        }
        if (e.target.name == 'campaignSource') {
            setCampaignSource(e.target.value)
        }
        if (e.target.name == 'contactName') {
            setContactName(e.target.value)
        }
        if (e.target.name == 'description') {
            setDescription(e.target.value)
        }
    }




    // function handleImageChange(event) {
    //     setImageName(event.target.value);
    //     setIsImageLoaded(true);
    //     console.log("Uploading image...");
    // }



    // function handleImageLoad() {
    //     setIsImageLoaded(true);
    // }




    const DealCreate = async () => {
        try {

            const data = { dealOwner, dealName, amount, closingDate, accountName, type, expectedRevenue, leadSource, campaignSource, contactName, description, author:registration };

            let CreateDeal = await fetch(`/api/Create/dealCreate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            let response = await CreateDeal.json()
            console.log(response)
            if (response.error) {
                toast.error(response.error, {
                    position: "top-center",
                    autoClose: 1100,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (response.success) {
                toast.success(response.success, {
                    position: "top-center",
                    autoClose: 200,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (err) {
            console.error(err)
        }


    }
    return (
        <section>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                limit={1}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme="light"
            />
            <div className='flex justify-end mr-5'>
                <Link href={'/'}>
                    <button className='px-5 py-2 mt-6 bg-red-600 text-sm mr-5 lg:text-base text-white rounded-[4px] shadow-md '>Cancel</button>
                </Link>
                <button onClick={DealCreate} className='px-5 py-2 mt-6 bg-blue-600 text-sm lg:text-base text-white rounded-[4px] shadow-md'>Create Deal</button>
            </div>
            <h4 className='text-black font-extrabold text-xl text-center mt-4'>Create Deal</h4>

            <div className='container mx-auto'>
                <div className='overflow-x-auto grid lg:grid-cols-2 mt-16'>



                    <div>
                        <form className="w-full max-w-lg mx-auto mt-8">
                            {/*<div className="mb-4">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="imageName">
                                    Image URL :
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="image-container"
                                    type="text"
                                    name='imageName'
                                    onChange={handleChange}
                                    value={imageName}
                                /> */}

                            {/* <div className="mt-2">
                                    {imageName && (
                                        <div className="flex items-center">
                                            <p className="text-gray-600 text-xs italic mr-2">{imageName}</p>
                                            {isImageLoaded?(

                                                <Image
                                                width={300}
                                                height={350}
                                                src={`${imageName}`}
                                                className="h-10 w-10 object-cover rounded-full"
                                                alt="dfdf"
                                                onBlur={handleImageLoad}
                                                />
                                            ):null }
                                            
                                        </div>
                                    )}

                                </div> */}
                            {/* </div> */}
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dealOwner">
                                        Deal Owner
                                    </label>
                                    <input onChange={handleChange} name='dealOwner' value={dealOwner} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="dealOwner" type="text" placeholder="Deal Owner" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dealName">
                                        Deal Name
                                    </label>
                                    <input onChange={handleChange} name='dealName' value={dealName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="dealName" type="text" placeholder="Deal Name" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="amount">
                                        Amount
                                    </label>
                                    <input onChange={handleChange} name='amount' value={amount} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="amount" type="text" placeholder="Amount" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="closingDate">
                                        Closing Date
                                    </label>
                                    <input onChange={handleChange} name='closingDate' value={closingDate} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="closingDate" type="date" />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="accountName">
                                        Account Name
                                    </label>
                                    <input onChange={handleChange} name='accountName' value={accountName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="accountName" type="text" placeholder="Account Name" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="type">
                                        Business type
                                    </label>
                                    <div className="relative">
                                        <select onChange={handleChange} name='type'
                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            value={type}
                                            id='type'
                                        >
                                            <option value={''}></option>
                                            <option value={'existing'}>Existing</option>
                                            <option value={'new'}>New</option>

                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M3.832 8.116a.5.5 0 01.707 0L10 13.293l5.46-5.461a.5.5 0 01.707.707l-5.748 5.748a1.5 1.5 0 01-2.121 0L3.125 8.823a.5.5 0 010-.707z" clipRule="evenodd" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>




                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="expectedRevenue">
                                        Expected Revenue
                                    </label>
                                    <input onChange={handleChange} name='expectedRevenue' value={expectedRevenue} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="expectedRevenue" type="text" placeholder="Expected Revenue" />
                                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="leadSource">
                                        Lead Source
                                    </label>
                                    <input onChange={handleChange} name='leadSource' value={leadSource} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="leadSource" type="text" placeholder="Lead Source" />
                                </div>
                            </div>


                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="campaignSource">
                                        Campaign Source
                                    </label>
                                    <input onChange={handleChange} name='campaignSource' value={campaignSource} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="campaignSource" type="text" placeholder="Campaign Source" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contactName">
                                        Contact Name
                                    </label>
                                    <input onChange={handleChange} name='contactName' value={contactName} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="contactName" type="text" placeholder="Campaign Name" />
                                </div>
                            </div>

                        </form>
                    </div>


                    <div>
                        <form className="w-full max-w-lg mx-auto mt-10">
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>

                                    <textarea id="story" name="description" rows="6" className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none'>
                                    </textarea>
                                </div>
                            </div>



                        </form>
                    </div>


                </div>
            </div>
        </section >
    )
}

export default createDeal


export async function getServerSideProps(context) {
    try {
      await connectDB();
  
      const companies = await Company.find({}, { _id: 0, updatedAt: 0 }).lean();
  
      return {
        props: {
            companies: companies.map((company) => ({
            ...company,
            author: (company.author) ? ((JSON.stringify(company.author)).slice(1,-1)) : '',
            createdAt: company.createdAt.toISOString(),
          })),
      },
      };
    } catch (error) {
      console.log(error);
      return {
        props: { companies: [] },
      };
    }
  }