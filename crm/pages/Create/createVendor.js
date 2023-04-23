import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateVendor = () => {
    const [imageName, setImageName] = useState('');
    const [vendorOwner, setVendorOwner] = useState("")
    const [vendorName, setVendorName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [website, setWebsite] = useState("")
    const [account, setAccount] = useState("")
    const [category, setCategory] = useState("")
    const [country, setCountry] = useState("")
    const [street, setStreet] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [description, setDescription] = useState("");



    const handleChange = (e) => {
        if (e.target.name == 'imageName') {
            setImageName(e.target.value)
        }
        if (e.target.name == 'vendorOwner') {
            setVendorOwner(e.target.value)
        }
        if (e.target.name == 'vendorName') {
            setVendorName(e.target.value)
        }
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        if (e.target.name == 'phone') {
            setPhone(e.target.value)
        }
        if (e.target.name == 'website') {
            setWebsite(e.target.value)
        }
        if (e.target.name == 'account') {
            setAccount(e.target.value)
        }
        if (e.target.name == 'category') {
            setCategory(e.target.value)
        }
        if (e.target.name == 'country') {
            setCountry(e.target.value)
        }
        if (e.target.name == 'street') {
            setStreet(e.target.value)
        }
        if (e.target.name == 'state') {
            setState(e.target.value)
        }
        if (e.target.name == 'city') {
            setCity(e.target.value)
        }
        if (e.target.name == 'zipcode') {
            setZipcode(e.target.value)
        }
        if (e.target.name == 'description') {
            setDescription(e.target.value)
        }

    }

    function handleImageChange(event) {
        setImageName(event.target.value);
        setIsImageLoaded(true);
        console.log("Uploading image...");
    }
    
    function handleImageLoad() {
        setIsImageLoaded(true);
    }
    


    const VendorCreate = async () => {
        try {

            const data = { imageName, vendorOwner, vendorName, email, phone, website, account, category, country, street, state, city, zipcode, description };

            let CreateLead = await fetch(`/api/Create/vendorCreate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            console.log(data)
            let response = await CreateLead.json()
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
                <button onClick={VendorCreate} className='px-5 py-2 mt-6 bg-blue-600 text-sm lg:text-base text-white rounded-[4px] shadow-md'>Create Vendor</button>
            </div>
            <h4 className='text-black font-extrabold text-xl text-center mt-4'>Create Vendor</h4>
            <div className='container mx-auto'>
                <div className='overflow-x-auto grid lg:grid-cols-2 mt-16'>



                    <div>
                        <form className="w-full max-w-lg mx-auto mt-8">
                            <div className="mb-4">
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
                                />
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
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="vendorOwner">
                                        Vendor Owner
                                    </label>
                                    <input onChange={handleChange} name='vendorOwner' value={vendorOwner} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="vendorOwner" type="text" placeholder="Vendor Owner" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="vendorName">
                                        Vendor Name
                                    </label>
                                    <input onChange={handleChange} name='vendorName' value={vendorName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="vendorName" type="text" placeholder="Vendor Name" />
                                </div>
                            </div>

                           

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Email">
                                        Email
                                    </label>
                                    <input onChange={handleChange} name='email' value={email} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="Email" type="email" placeholder="john@mail.com" />
                            
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Phone">
                                        Phone
                                    </label>
                                    <input onChange={handleChange} name='phone' value={phone} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Phone" type="text" placeholder="Phone Number" />
                                </div>
                            </div>


                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Website">
                                        Website
                                    </label>
                                    <input onChange={handleChange} name='website' value={website} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="Website" type="email" placeholder="www.domain.com" />
                                </div>

                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="account">
                                        Account
                                    </label>
                                    <input onChange={handleChange} name='account' value={account} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="account" type="text" placeholder="Account" />
                                </div>
                              </div>


                            <div className="flex flex-wrap -mx-3 mb-6">
                               
                                
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
                                    Category
                                    </label>
                                    <input onChange={handleChange} name='category' value={category} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="category" type="text" placeholder="category" />
                                </div>
                            </div>
                        </form>
                    </div>


                    <div>
                        <form className="w-full max-w-lg mx-auto mt-10">
                            <div className="flex flex-wrap -mx-3 mb-6">

                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="country">
                                        Country
                                    </label>
                                    <input onChange={handleChange} name='country' value={country} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="country" type="text" placeholder="Country" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street">
                                        Street
                                    </label>
                                    <input onChange={handleChange} name='street' value={street} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="street" type="text" placeholder="Street" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                                        State
                                    </label>
                                    <input onChange={handleChange} name='state' value={state} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="state" type="text" placeholder="State" />
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                                        City
                                    </label>
                                    <input onChange={handleChange} name='city' value={city} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="city" type="text" placeholder="City" />
                                </div>
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="zip">
                                        Zip code
                                    </label>
                                    <input onChange={handleChange} name='zipcode' value={zipcode} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="zip" type="text" placeholder="Zip Code" />
                                </div>
                            </div>

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>

                                    <textarea id="story" onChange={handleChange} name="description" value={description} rows="4" className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white resize-none'>
                                    </textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CreateVendor