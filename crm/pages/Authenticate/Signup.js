import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import CryptoJS from "crypto-js"
import Link from 'next/link';
const Signup = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_ENCRYPTION_KEY).toString();
        const res = await axios.post('/api/Authenticate/authenticate', {
            username,
            email,
            phone,
            password: encryptedPassword,
        });
        if (res.status === 201) {
            router.push(`/Authenticate/verify?email=${email}`);
        }
    };
    return (
        <section>
            <div className="flex flex-col justify-center items-center h-[100vh]">
                <div className="z-5 relative flex flex-col rounded-[20px] max-w-[300px] md:max-w-[400px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-6 3xl:p-![18px] undefined">

                    <div className="relative flex flex-row justify-center">
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-3 text-center">
                           SIGN UP 
                        </h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="text-sm text-navy-700 dark:text-white font-bold">Full Name</label>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="username" placeholder="John Doe" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="text-sm text-navy-700 dark:text-white font-bold">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="email" placeholder="john@mail.com" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="text-sm text-navy-700 dark:text-white font-bold">Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" id="phone" placeholder="+91 9218321314" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="text-sm text-navy-700 dark:text-white font-bold">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="*********" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200" />
                        </div>

                            <button className="mb-3 w-full bg-gray-900 text-white text-center py-3 border rounded-full hover:bg-black" type='submit'>Register</button>
                        
                    </form>
                    <Link href="/Authenticate/Login" className='text-xs text-right underline'>Already Have a Account!!</Link>
                    <div className="mt-3 text-xs text-center text-red-600">
                        Please Check Your Mail After You Register
                    </div>
                    
                </div>
            </div>

        </section>
    )
}

export default Signup