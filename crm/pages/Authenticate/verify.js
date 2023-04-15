import React from 'react'
import { useState } from "react";
import Router, { useRouter } from "next/router";
import axios from "axios";

const Verify = () => {
    const router = useRouter();
    const { email } = router.query;
    const [otpCode, setOtpCode] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/api/Authenticate/authenticate", {
                email,
                otpCode,
            });
            Router.push("/Authenticate/Login");
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <section>
            <div className="flex flex-col justify-center items-center h-[100vh]">
                <div className="z-5 relative flex flex-col rounded-[20px] max-w-[300px] md:max-w-[400px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-6 3xl:p-![18px] undefined">

                    <div className="relative flex flex-row justify-center">
                        <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-3 text-center">
                            Verify User
                        </h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="text-sm text-navy-700 dark:text-white font-bold">Email</label>
                            <input value={email} type="text" id="username" placeholder="John Doe" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200 readonly" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="otpCode" className="text-sm text-navy-700 dark:text-white font-bold">Enter Your OTP:</label>
                            <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} type="text" id="otpCode" placeholder="One Time Password" className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200" />
                        </div>
                        <button className="mb-3 w-full bg-gray-900 text-white text-center py-3 border rounded-full hover:bg-black" type='submit'>Register</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Verify