import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import Company from '@/Models/createCompany'
import Images from '@/Models/Image'
import connectDB from '@/Middleware/db';
import Image from 'next/image';
import { MdCloudUpload } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';




const CreateCompany = ({ company, images }) => {
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState(null);



  const router = useRouter()
  if (company.some(item => item.author === registration) && images.some(item => item.author === registration)) {
    router.push('/')
  }
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
      setRegistration(null);
      setSelectedImagePreview(null)
    }



  }, [])

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedImagePreview(URL.createObjectURL(file))

    }
  };

  const handleImageSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error('Please select an Image file', {
        position: "top-center",
        autoClose: 1100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    console.log(selectedFile);

    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('author', registration);

    try {
      const response = await fetch('/api/Create/uploadImage', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Image uploaded successfully!', {
          position: "top-center",
          autoClose: 1100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSelectedFile(null);
        setSelectedImagePreview(null)
        router.push('/Create/createCompany')



      } else {
        const data = await response.text();
        console.log(data);
        toast.error('Failed to upload image', {
          position: "top-center",
          autoClose: 1100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Error Occurred While Uploading', {
        position: "top-center",
        autoClose: 1100,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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
      const data = { ownerName, companyName, gstin, companyStreet, companyCity, companyState, companyCountry, companyZipcode, companyWebsite, author: registration };

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
        router.push('/Create/createCompany')

      }



    } catch (error) {
      console.log(error)
    }
  }



  const displayRegistration = (company.some(item => item.author === registration) && images.some(item => item.author === registration)) ?
    null :
    (
      <section className='md:flex'>
        {!images.some(item => item.author === registration) && (

          <div className='md:w-1/3 md:ml-5'>
            <div className='bg-white rounded-md border-t-4 border-black mt-12'>
              <div>
                <h1 className=" font-bold text-3xl flex gap-1 text-center items-center justify-center my-10 font-mono">Company Image</h1>
                <form onSubmit={handleImageSubmit}>
                  <label htmlFor="image" className="flex items-center justify-center gap-1 cursor-pointer">
                    <MdCloudUpload size={28} />
                    <span>{selectedFile ? 'Change Image' : 'Upload Image'}</span>

                    <input className="hidden" type="file" id="image" name="image" onChange={handleImageChange} />
                  </label>

                  {selectedImagePreview && (
                    <div className='flex justify-center'>
                      <Image width={200} height={250} className='w-40 aspect-[2/3]' src={selectedImagePreview} alt="Selected Image" />
                    </div>
                  )}
                  <div className=' flex justify-center my-4 py-4'>

                    <button className='rounded-full border-2 p-2 bg-blue-400' type="submit"><TiTickOutline size={30} /></button>
                  </div>
                </form>


              </div>

            </div>

          </div>
        )}
        {!company.some(item => item.author === registration) && (
          <div className='container md:mr-5'>
            <div className='bg-white md:ml-16 md:w-10/12  my-4 mt-12 rounded-md border-t-4 border-black py-6  px-12'>
              <h1 className=" font-bold text-3xl flex gap-1 text-center items-center justify-center my-10 font-mono">Company Details</h1>
              <div className='grid md:grid-cols-2'>
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
                  <div className="relative">
                    <input onChange={handleChange} value={ownerName} type="text" name="ownerName" id="ownerName" placeholder='Full Name' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                    <label htmlFor="ownerName" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Full Name</label>
                  </div>
                </div>
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
                  <div className="relative">
                    <input onChange={handleChange} value={companyName} type="text" name="companyName" id="companyName" placeholder='Company Name' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                    <label htmlFor="companyName" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Company Name</label>
                  </div>
                </div>
              </div>
              <div className='grid md:grid-cols-2'>
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
                  <div className="relative">
                    <input onChange={handleChange} value={gstin} type="text" name="gstin" id="gstin" placeholder='GSTIN' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                    <label htmlFor="gstin" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">GSTIN</label>
                  </div>
                </div>
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
                  <div className="relative">
                    <input onChange={handleChange} value={companyStreet} type="text" name="companyStreet" id="companyStreet" placeholder='Street' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                    <label htmlFor="companyStreet" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Street</label>
                  </div>
                </div>
              </div>
              <div className='grid md:grid-cols-2'>
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
                  <div className="relative">
                    <input onChange={handleChange} value={companyCity} type="text" name="companyCity" id="companyCity" placeholder='City' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                    <label htmlFor="companyCity" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">City</label>
                  </div>
                </div>
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
                  <div className="relative">
                    <input onChange={handleChange} value={companyState} type="text" name="companyState" id="companyState" placeholder='State' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                    <label htmlFor="companyState" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">State</label>
                  </div>
                </div>
              </div>
              <div className='grid md:grid-cols-2'>
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
                  <div className="relative">
                    <input onChange={handleChange} value={companyCountry} type="text" name="companyCountry" id="companyCountry" placeholder='Country' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                    <label htmlFor="companyCountry" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Country</label>
                  </div>
                </div>
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
                  <div className="relative">
                    <input onChange={handleChange} value={companyZipcode} type="text" name="companyZipcode" id="companyZipcode" placeholder='Pincode' className="block w-full py-2 px-3 rounded-md border-2 border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-200 ease-in-out" />
                    <label htmlFor="companyZipcode" className="absolute -top-2 left-1 -mt-px text-xs font-medium text-gray-400 bg-white px-1 peer-placeholder-shown:transform peer-placeholder-shown:text-xs peer-placeholder-shown:font-bold peer-placeholder-shown:uppercase peer-placeholder-shown:transition-opacity peer-placeholder-shown:duration-200 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Pincode</label>
                  </div>
                </div>
              </div>
              <div className='grid md:grid-cols-2'>
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 p-1 mx-2 shadow-sm focus-within:shadow-inner my-2">
                  <div className="relative">
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
        )}
      </section>
    )

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
      {displayRegistration}

    </section>
  )
}

export default CreateCompany


export async function getServerSideProps(context) {
  try {
    await connectDB();

    const company = await Company.find({})
    const images = await Images.find({})


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

    const imageDetails = images.map((item) => ({
      _id: item.id,
      url: item.url,
      author: (item.author) ? (JSON.stringify(item.author).slice(1, -1)) : "",
    }));
    return {
      props: {
        company: companyDetails,
        images: imageDetails,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { company: [], images: [] },
    };
  }
}