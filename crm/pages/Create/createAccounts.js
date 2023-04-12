import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createAccount = () => {
    const [imageName, setImageName] = useState('');
    const [accountOwner, setAccountOwner] = useState("")
    const [accountName, setAccountName] = useState("")
    const [accountSite, setAccountSite] = useState("")
    const [parentAccount, setParentAccount] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [revenue, setRevenue] = useState("")
    const [ownership, setOwnership] = useState("")
    const [employee, setEmployee] = useState("")
    const [phone, setPhone] = useState("")
    const [website, setWebsite] = useState("")
    const [country, setCountry] = useState("")
    const [street, setStreet] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [isImageLoaded, setIsImageLoaded] = useState(false);



    const handleChange = (e) => {
        if (e.target.name == 'imageName') {
            setImageName(e.target.value)
        }
        if (e.target.name == 'accountOwner') {
            setAccountOwner(e.target.value)
        }
        if (e.target.name == 'accountName') {
            setAccountName(e.target.value)
        }
        if (e.target.name == 'accountSite') {
            setAccountSite(e.target.value)
        }
        if (e.target.name == 'parentAccount') {
            setParentAccount(e.target.value)
        }
        if (e.target.name == 'accountNumber') {
            setAccountNumber(e.target.value)
        }
        if (e.target.name == 'revenue') {
            setRevenue(e.target.value)
        }
        if (e.target.name == 'ownership') {
            setOwnership(e.target.value)
        }
        if (e.target.name == 'employee') {
            setEmployee(e.target.value)
        }
        if (e.target.name == 'phone') {
            setPhone(e.target.value)
        }
        if (e.target.name == 'website') {
            setWebsite(e.target.value)
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

    }

    function handleImageChange(event) {
        setImageName(event.target.value);
        setIsImageLoaded(true);
        console.log("Uploading image...");
    }

    function handleImageLoad() {
        setIsImageLoaded(true);
    }



    const AccountCreate = async () => {
        try {

            const data = { imageName, accountOwner, accountName, accountSite, parentAccount, accountNumber, revenue, ownership, employee, phone, website, country, street, state, city, zipcode };

            let CreateAccount = await fetch(`/api/Create/accountCreate`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            console.log(data)
            let response = await CreateAccount.json()
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
    function mytestFunc() {
        console.log("entered")
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
                <button onClick={AccountCreate} className='px-5 py-2 mt-6 bg-blue-600 text-sm lg:text-base text-white rounded-[4px] shadow-md'>Create Account</button>
            </div>
            <h4 className='text-black font-extrabold text-xl text-center mt-4'>Create Account</h4>

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
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="accountOwner">
                                        Account Owner
                                    </label>
                                    <input onChange={handleChange} name='accountOwner' value={accountOwner} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="accountOwner" type="text" placeholder="Account Owner" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="accountName">
                                        Account Name
                                    </label>
                                    <input onChange={handleChange} name='accountName' value={accountName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="accountName" type="text" placeholder="Company Name" />
                                </div>
                            </div>

                            {/* <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="salutation">
                                        Salutation
                                    </label>
                                    <div className="relative">
                                        <select onChange={handleChange} name='salutation'
                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            value={salutation}
                                            id='salutation'
                                        >
                                            <option value={''}></option>
                                            <option value={'Mr'}>Mr</option>
                                            <option value={"Mrs"}>Mrs</option>
                                            <option value={"Ms"}>Ms</option>
                                            <option value={"Dr"}>Dr</option>
                                            <option value={"Prof"}>Prof</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M3.832 8.116a.5.5 0 01.707 0L10 13.293l5.46-5.461a.5.5 0 01.707.707l-5.748 5.748a1.5 1.5 0 01-2.121 0L3.125 8.823a.5.5 0 010-.707z" clipRule="evenodd" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="Name">
                                        Name
                                    </label>
                                    <input onChange={handleChange} name='name' value={name} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Name" type="text" placeholder="John Doe" />
                                </div>
                            </div> */}

                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="accountSite">
                                        Account Site
                                    </label>
                                    <input onChange={handleChange} name='accountSite' value={accountSite} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="accountSite" type="text" placeholder="Account Site" />
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="parentAccount">
                                        Parent Account
                                    </label>
                                    <input onChange={handleChange} name='parentAccount' value={parentAccount} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="parentAccount" type="text" placeholder="Parent Account" />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="accountNumber">
                                        Account Number
                                    </label>
                                    <input onChange={handleChange} name='accountNumber' value={accountNumber} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="accountNumber" type="text" placeholder="Account Number" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="revenue">
                                        Annual Revenue
                                    </label>
                                    <input onChange={handleChange} name='revenue' value={revenue} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="revenue" type="text" placeholder="₹" />
                                </div>
                            </div>



                            <div className="flex flex-wrap -mx-3 mb-6">

                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ownership">
                                        Ownership
                                    </label>
                                    <div className="relative">
                                        <select onChange={handleChange} name='ownership' value={ownership} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="ownership">
                                            <option value={""}></option>
                                            <option value={"Public"}>Public</option>
                                            <option value={"Private"}>Private</option>
                                            <option value={"Subsidiary"}>Subsidiary</option>
                                            <option value={"Others"}>Others</option>

                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="employee">
                                        Employees
                                    </label>
                                    <input onChange={handleChange} name='employee' value={employee} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="employee" type="text" placeholder="Employees" />
                                </div>
                            </div>




                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                                        Phone
                                    </label>
                                    <input onChange={handleChange} name='phone' value={phone} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="phone" type="text" placeholder="Phone Number" />
                                </div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="website">
                                        Website
                                    </label>
                                    <input onChange={handleChange} name='website' value={website} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="website" type="website" placeholder="www.domain.com" />
                                    {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
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


                        </form>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default createAccount