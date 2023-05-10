import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Company from '@/Models/createCompany'
import connectDB from '@/Middleware/db';

const CreateCompany = ({ company }) => {
  const [ownerName, setOwnerName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [gstin, setGstin] = useState("")
  const [companyStreet, setCompanyStreet] = useState("")
  const [companyCity, setCompanyCity] = useState("")
  const [companyState, setCompanyState] = useState("")
  const [companyZipcode, setCompanyZipcode] = useState("")
  const [companyCountry, setCompanyCountry] = useState("")
  const [companyWebsite, setCompanyWebsite] = useState("")
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
  if(company.some(item => item.author === registration)){
    router.push('/')

  }


  const handleChange = (e) => {
    if (e.target.name == 'ownerName') {
      setOwnerName(e.target.value)
    }
    if (e.target.name == 'companyName') {
      setCompanyName(e.target.value)
    } if (e.target.name == 'gstin') {
      setGstin(e.target.value)
    } if (e.target.name == 'companyStreet') {
      setCompanyStreet(e.target.value)
    } if (e.target.name == 'companyCity') {
      setCompanyCity(e.target.value)
    } if (e.target.name == 'companyState') {
      setCompanyState(e.target.value)
    } if (e.target.name == 'companyCountry') {
      setCompanyCountry(e.target.value)
    } if (e.target.name == 'companyZipcode') {
      setCompanyZipcode(e.target.value)
    } if (e.target.name == 'companyWebsite') {
      setCompanyWebsite(e.target.value)
    }

  }

  const handleSubmit = async () => {
    try {

      const data = { ownerName, companyName, gstin, companyStreet, companyCity, companyState, companyCountry, companyZipcode, companyWebsite, author:registration };

      let CreateCompany = await fetch(`/api/Authenticate/companyRegister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      console.log(data)
      let response = await CreateCompany.json()
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
        setOwnerName("")
        setCompanyName("")
        setGstin("")
        setCompanyStreet("")
        setCompanyCity("")
        setCompanyState("")
        setCompanyZipcode("")
        setCompanyCountry("")
        setCompanyWebsite("")
        router.push('/')
        
      }



    } catch (error) {
      console.log(error)
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
      <div className='container'>
        <h1 className=" mb-1 font-bold text-3xl flex gap-1 items-center justify-center my-12 font-mono">Company Details</h1>
        <div className='bg-white mx-auto md:w-10/12 lg:w-9/12 my-5 rounded-md border-t-4 border-black py-16 px-12'>

          <div className='grid md:grid-cols-2'>
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
              <div class="relative">
                <input onChange={handleChange} value={ownerName} type="text" name="ownerName" id="ownerName" placeholder='Full Name' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                <label htmlFor="ownerName" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Full Name</label>
              </div>
            </div>
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
              <div class="relative">
                <input onChange={handleChange} value={companyName} type="text" name="companyName" id="companyName" placeholder='Company Name' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                <label htmlFor="companyName" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Company Name</label>
              </div>
            </div>
          </div>

          <div className='grid md:grid-cols-2'>
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
              <div class="relative">
                <input onChange={handleChange} value={gstin} type="text" name="gstin" id="gstin" placeholder='GSTIN' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                <label htmlFor="gstin" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">GSTIN</label>
              </div>
            </div>
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
              <div class="relative">
                <input onChange={handleChange} value={companyStreet} type="text" name="companyStreet" id="companyStreet" placeholder='Street' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                <label htmlFor="companyStreet" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Street</label>
              </div>
            </div>
          </div>


          <div className='grid md:grid-cols-2'>
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
              <div class="relative">
                <input onChange={handleChange} value={companyCity} type="text" name="companyCity" id="companyCity" placeholder='City' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                <label htmlFor="companyCity" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">City</label>
              </div>
            </div>
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
              <div class="relative">
                <input onChange={handleChange} value={companyState} type="text" name="companyState" id="companyState" placeholder='State' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                <label htmlFor="companyState" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">State</label>
              </div>
            </div>
          </div>


          <div className='grid md:grid-cols-2'>

            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
              <div class="relative">
                <input onChange={handleChange} value={companyCountry} type="text" name="companyCountry" id="companyCountry" placeholder='Country' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                <label htmlFor="companyCountry" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Country</label>
              </div>
            </div>

            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
              <div class="relative">
                <input onChange={handleChange} value={companyZipcode} type="text" name="companyZipcode" id="companyZipcode" placeholder='Pincode' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                <label htmlFor="companyZipcode" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Pincode</label>
              </div>
            </div>
          </div>



          <div className='grid md:grid-cols-2'>
            <div class="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
              <div class="relative">
                <input onChange={handleChange} value={companyWebsite} type="text" name="companyWebsite" id="companyWebsite" placeholder='www.domain.com' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                <label htmlFor="companyWebsite" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Website</label>
              </div>
            </div>



          </div>


          <div className='flex items-center justify-end'>
            <button onClick={handleSubmit} className='px-10 py-4 bg-blue-500 text-black rounded-lg hover:bg-blue-600 hover:text-white'>Create Company</button>
          </div>


        </div>
      </div>
    </section>
  )
}

export default CreateCompany


export async function getServerSideProps(context) {
  try {
    await connectDB();

    const company = await Company.find({})

    const companyDetails = company.map((item) => ({
      _id: item.id,
      ownerName: item.ownerName,
      companyName: item.companyName,
      companyStreet: item.companyStreet,
      companyCity: item.companyCity,
      companyState: item.companyState,
      companyZipcode: item.companyZipcode,
      companyCountry: item.companyCountry,
      author: (item.author) ? (JSON.stringify(item.author).slice(1, -1)) : "",
    }));
    return {
      props: {
        company: companyDetails,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { company: [] },
    };
  }
}