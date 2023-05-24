import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LogNav = () => {

    
  return (
    <header className="flex items-center bg-white shadow-lg">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <div className="w-24">
          <Link href="/">
              <Image
                src="/crmLogo.jpg"
                alt="logo"
                width={40}
                height={30}
                className="object-contain"
              />
          </Link>
        </div>
        <nav className="space-x-4">
          <Link href={'/Authenticate/Signup'} className="text-gray-600 hover:text-gray-900 font-medium">Sign Up
          </Link>
          <Link href={'/Authenticate/Login'} className="text-gray-600 hover:text-gray-900 font-medium">Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LogNav;
