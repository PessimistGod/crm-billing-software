import React, { useEffect, useState } from 'react'
import { RiUser3Fill } from 'react-icons/ri'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlinePlus } from 'react-icons/ai'
import Signup from '@/Models/signup'
import connectDB from '@/Middleware/db'

import { MdClose } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import jwt_decode from 'jwt-decode'
import {
  MdOutlineMoreHoriz

} from "react-icons/md";
import { useRouter } from 'next/router'


const Navbar = ({ users }) => {
  console.log(users)
  const [menuClose, setMenuClose] = useState(true)

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const router = useRouter();

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.clear();
      router.push('/Authenticate/Login');
    }
  };


  function showLeftMenu() {
    let z = document.getElementById("leftMenuComp");
    if (z.style.display === "" && z.style.position === "") {
      z.style.display = "block"
      z.style.position = "absolute";
      setMenuClose(false)

    } else {
      z.style.display = ""
      z.style.position = "";
      setMenuClose(true)
    }
  }

  function ShowAdditionalMenu() {
    let addiMenuID = document.getElementById("additionalMenuID");
    if (addiMenuID.style.display === "" && addiMenuID.style.position === "") {
      addiMenuID.style.display = "block"
      addiMenuID.style.position = "absolute"
    } else {
      addiMenuID.style.display = ""
      addiMenuID.style.position = ""
    }
  }


  function ShowAdditionalCreateMenu() {
    let addiRightMenuID = document.getElementById("additionalRightMenuID");
    console.log(addiRightMenuID.style.display)
    console.log(addiRightMenuID.style.position)

    if (addiRightMenuID.style.display === "" && addiRightMenuID.style.position === "") {
      addiRightMenuID.style.display = "block"
      addiRightMenuID.style.position = "absolute"
    } else {
      addiRightMenuID.style.display = ""
      addiRightMenuID.style.position = ""
    }
  }

  function RightDisplayDrop() {

    let addiRightMenuID = document.getElementById("additionalRightMenuID");
    addiRightMenuID.style.display = ""
    addiRightMenuID.style.position = ""


  }


  function LeftDisplayDrop() {

    let addiMenuID = document.getElementById("additionalMenuID");
    addiMenuID.style.display = ""
    addiMenuID.style.position = ""


  }
  const [registration, setRegistration] = useState("")


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


  return (
    <>
      <section
        className="flex w-full items-center bg-white overflow-x-clip sticky top-0 z-20 shadow-lg"
      >
        <div className="container mx-auto sticky">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">
              <Link href={'#'} className="block w-full py-5">
                <Image width={300} height={10}
                  src="/crmLogo.jpg"
                  alt="logo"
                  className="w-16 px-2 ml-6 object-contain mix-blend-color-burn"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  className="ring-primary absolute right-4 top-1/2 block -translate-y-1/2 rounded-md px-3 py-[6px] focus:ring-2 md:hidden"
                >
                  <span
                    className="bg-body-color relative my-[6px] block h-[2px] w-[30px]"
                  ></span>
                  <span
                    className="bg-body-color relative my-[6px] block h-[2px] w-[30px]"
                  ></span>
                  <span
                    className="bg-body-color relative my-[6px] block h-[2px] w-[30px]"
                  ></span>
                </button>
                <nav
                  className="hidden py-5 px-6 shadow md:static md:block md:w-full md:max-w-full md:shadow-none"
                >
                  <ul className="block md:flex">
                    <li>
                      <Link href={'/'}
                        className="text-dark hover:text-blue-600 flex py-2 text-base font-medium md:ml-12 md:inline-flex"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href={'/Display/displayLead'}
                        className="text-dark hover:text-blue-600 flex py-2 text-base font-medium md:ml-12 md:inline-flex"
                      >
                        Leads
                      </Link>
                    </li>
                    <li>
                      <Link href={'/Display/displayContact'}
                        className="text-dark hover:text-blue-600 flex py-2 text-base font-medium md:ml-12 md:inline-flex"
                      >
                        Contacts
                      </Link>
                    </li>
                    <li>
                      <Link href={'/Display/displayAccount'}
                        className="text-dark hover:text-blue-600 flex py-2 text-base font-medium md:ml-12 md:inline-flex"
                      >
                        Accounts
                      </Link>
                    </li>
                    <li>
                      <Link href={'/Display/displayDeal'}
                        className="text-dark hover:text-blue-600 flex py-2 text-base font-medium md:ml-12 md:inline-flex"
                      >
                        Deals
                      </Link>
                    </li>
                    <li>
                      <div className="relative inline-block text-left">
                        <div className='md:ml-10'>

                          <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={ShowAdditionalMenu}>
                            <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white" />

                          </button>
                        </div>
                        <div onMouseLeave={LeftDisplayDrop} className="absolute hidden right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" id='additionalMenuID' role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                          <div className="py-1" role="none">
                            <Link href={'/Display/displayProduct'} className="text-gray-700 hover:text-blue-600 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Products</Link>
                            <Link href={'/Display/displaySales'} className="text-gray-700 hover:text-blue-600 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Sales Order</Link>
                          </div>
                          <div className="py-1" role="none">
                            <Link href={'/Display/displayPurchase'} className="text-gray-700 block px-4 py-2 text-sm hover:text-blue-600" role="menuitem" tabIndex="-1" id="menu-item-2">Purchase Order</Link>
                            <Link href={'/Display/displayVendor'} className="text-gray-700 block px-4 py-2 text-sm hover:text-blue-600" role="menuitem" tabIndex="-1" id="menu-item-3">Vendors</Link>
                          </div>
                          <div className="py-1" role="none">
  <div className="relative group">
    <Link
      href={'#'}
      className="text-gray-700 block px-4 py-2 text-sm hover:text-blue-600"
      role="menuitem"
      tabIndex="-1"
      id="menu-item-4"
    >
      Invoices <span className="ml-1">&#8250;</span>
    </Link>
    <div className="absolute -top-3 left-full mt-2 opacity-0 group-hover:opacity-100 bg-white shadow-md ">
      <Link
        href={'#'}
        className="text-gray-700 block px-10 w-48 py-2 text-sm hover:text-blue-600 border-b-[0.5px]"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-5"
      >
        Sales Invoice
      </Link>
      <Link
        href={'#'}
        className="text-gray-700 block px-10 w-48 py-2 text-sm hover:text-blue-600"
        role="menuitem"
        tabIndex="-1"
        id="menu-item-6"
      >
        Purchase Invoice
      </Link>
    </div>
  </div>
</div>



                          {/* <div className="py-1" role="none">
                            <Link href={'#'} className="text-gray-700 px-4 py-2 text-sm flex items-center" role="menuitem" tabIndex="-1" id="menu-item-6"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mr-1">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                            </svg>
                              New Module</Link>
                          </div> */}
                        </div>
                      </div>

                    </li>




                  </ul>
                </nav>
              </div>
              <div className="pr-6 flex md:pr-4 items-center">


                <div className='pr-2'>
                  <div className="relative inline-block text-left">
                    <div>


                      <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={ShowAdditionalCreateMenu}>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 border-gray-600 border font-bold">

                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                      </button>
                    </div >
                    <div id='additionalRightMenuID' onMouseLeave={RightDisplayDrop} className="absolute hidden right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1" >
                      <div className="py-1 " role="none">
                        <Link href={'/Create/createLead'} className="text-gray-700 px-4 py-2 text-sm flex items-center hover:bg-black hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-0"><AiOutlinePlus className='mr-2 flex items-center mt-[0.9px] hover:text-white' size={16}/> Lead</Link>
                        <Link href={'/Create/createContact'} className="text-gray-700  px-4 py-2 text-sm flex items-center hover:bg-black hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-1"><AiOutlinePlus className='mr-2 flex items-center mt-[0.9px] hover:text-white' size={16}/> Contact</Link>
                      </div>
                      <div className="py-1" role="none">
                        <Link href={'/Create/createAccounts'} className="text-gray-700 px-4 py-2 text-sm flex items-center hover:bg-black hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-2"><AiOutlinePlus className='mr-2 flex items-center mt-[0.9px] hover:text-white' size={16}/> Accounts</Link>
                        <Link href={'/Create/createDeal'} className="text-gray-700 px-4 py-2 text-sm flex items-center hover:bg-black hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-3"><AiOutlinePlus className='mr-2 flex items-center mt-[0.9px] hover:text-white' size={16}/> Deals</Link>
                      </div>
                      <div className="py-1" role="none">
                        <Link href={'/Create/createProduct'} className="text-gray-700 px-4 py-2 text-sm flex items-center hover:bg-black hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-4"><AiOutlinePlus className='mr-2 flex items-center mt-[0.9px] hover:text-white' size={16}/> Product</Link>
                        <Link href={'/Create/createSales'} className="text-gray-700 px-4 py-2 text-sm flex items-center hover:bg-black hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-5"><AiOutlinePlus className='mr-2 flex items-center mt-[0.9px] hover:text-white' size={16}/> Sales</Link>
                      </div>
                      <div className="py-1" role="none">
                        <Link href={'/Create/createPurchase'} className="text-gray-700 px-4 py-2 text-sm flex items-center hover:bg-black hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-4"><AiOutlinePlus className='mr-2 flex items-center mt-[0.9px] hover:text-white' size={16}/> Purchase</Link>
                        <Link href={'/Create/createVendor'} className="text-gray-700 px-4 py-2 text-sm flex items-center hover:bg-black hover:text-white" role="menuitem" tabIndex="-1" id="menu-item-5"><AiOutlinePlus className='mr-2 flex items-center mt-[0.9px] hover:text-white' size={16}/> Vendors</Link>
                      </div>
                      {/* <div className="py-1" role="none">
                        <Link href={'/Create/createInvoice'} className="text-gray-700 block px-4 py-2 text-sm hover:text-blue-600" role="menuitem" tabIndex="-1" id="menu-item-6">Create Invoice</Link>
                      </div> */}
                    </div>
                  </div>
                </div>


                <div>
  {users &&
    users
      .filter(item => item._id === registration)
      .map(item => <div key={item._id}>{item.username}</div>)}
</div>

                <div className='pr-4 '>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
<div className='flex' onClick={handleLogout}>Logout</div> 

                <div className='md:hidden pr-4'>
                  {menuClose ? (<RxHamburgerMenu size={28} className="absolute right-7 top-[1.10rem]" onClick={showLeftMenu} />) : (<MdClose size={30} className="absolute right-7 top-[1.10rem]" onClick={showLeftMenu} />)}
                </div>

              </div>
            </div>



          </div>
        </div>
        <div>



        </div>

      </section>

    </>
  )
}

export default Navbar



export async function getServerSideProps(context) {
  try {
    await connectDB();

    const user = await Signup.find({}, { _id: 0, updatedAt: 0 ,createdAt:0}).lean();

    return {
      props: {
          users: user.map((user) => ({
          ...user
        })),
    },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { users: [] },
    };
  }
}