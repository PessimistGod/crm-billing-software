import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { MdOutlineSpaceDashboard,MdOutlineArrowDropDown,MdClose,MdOutlineHome } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';




const LeftMenu = () => {
  const [crm, setCrm] = useState('CRM');
  // const [dashboard, setDashboard] = useState(<MdOutlineSpaceDashboard size={28} />);

const [menuClose, setMenuClose] = useState(true)

  function dropDownDashboard(){
    var x = document.getElementById("displayDropDown");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  }


  function showLeftMenu(){
    let z = document.getElementById("leftMenuComp");
  if(z.style.display === "" && z.style.position === "") {
    z.style.display = "block"
    z.style.position = "absolute";
    setMenuClose(false)
    
    }else{
      z.style.display = ""
      z.style.position = "";
     

      setMenuClose(true)
    }
    } 



  useEffect(() => {
 
    function handleResize() {
      if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
        setCrm('CRM Billing System');
        // setDashboard(<><MdOutlineSpaceDashboard size={26} /> <div className='font-bold'>Dashboard</div></>)
      } else {
        setCrm('CRM');
        // setDashboard(<MdOutlineSpaceDashboard size={28} onClick={dropDownDashboard}/>)

      }
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
     
    };
  }, []);



  return (
    <>
    {menuClose ? (<RxHamburgerMenu size={26} className="absolute right-4 top-2" onClick={showLeftMenu}/>) : (<MdClose size={28} className="absolute right-4 top-2" onClick={showLeftMenu}/>)}
   
    <div id="leftMenuComp" className='h-[100vh] w-56 bg-[#f8f9fa] text-black left-6 z-10 hidden md:none shadow-xl border rounded-2xl '>
      <div>
        <div className='flex justify-center mt-4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
          </svg>

          <h1 className='font-bold text-xs lg:text-base'>{crm}</h1>
        </div>

        <hr className='border border-b-1 border-gray-200 mt-5 mx-3 ' />

        <div className='flex ml-3 mt-6 leftMenuDesign'>
        <MdOutlineHome size={28}/> <div className='font-bold'>Home</div>
        </div>

        <div className='flex ml-3 mt-6 leftMenuDesign'>
        <MdOutlineSpaceDashboard size={26} /> <div className='font-bold'>Dashboard</div><MdOutlineArrowDropDown className='mt-1 mx-2' size={20} onClick={dropDownDashboard}/>
        </div>
        <div id='displayDropDown' className='ml-12 list-none'>
          <Link className='leftMenuDesign block' href="/"><li>Element 1</li></Link>
          <Link className='leftMenuDesign block' href="/"><li>Element 2</li></Link>
          <Link className='leftMenuDesign block' href="/"><li>Element 3</li></Link>
          <Link className='leftMenuDesign block' href="/"><li>Element 4</li></Link>
        </div>

        <div className='flex ml-3 mt-6 leftMenuDesign'>
        <MdOutlineSpaceDashboard size={26} /> <div className='font-bold'>Dashboard</div>

        </div>
      <hr className='border border-b-1 border-gray-200 mt-5 mx-3 ' />
      </div>
    </div>

    </>
  )
}

export default LeftMenu