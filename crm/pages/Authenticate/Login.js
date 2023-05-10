import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/Authenticate/login', {
            email,
            password,
        });
        if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            console.log("login Success")
            router.push('/')
        }
    };
    return (
        <section>
            <div className="flex flex-col justify-center items-center h-[100vh]">
                <div className="z-5 relative flex flex-col rounded-[20px] max-w-[300px] md:max-w-[400px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-6 3xl:p-![18px] undefined">

                    <div className="relative flex flex-row justify-center">
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-3 text-center">
                            Login
                        </h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="text-sm text-navy-700 dark:text-white font-bold">Email:</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="John@mail.com" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="text-sm text-navy-700 dark:text-white font-bold">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="*********" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200" />
                        </div>

                        <button className="mb-3 w-full bg-gray-900 text-white text-center py-3 border rounded-full hover:bg-black" type='submit'>Register</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login