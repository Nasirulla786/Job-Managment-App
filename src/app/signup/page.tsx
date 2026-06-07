//@ts-nocheck
'use client'

import { Signup } from "@/services/firebaseAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Page() {



    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('')
    const [showError, setShowError] = useState('');
    const router = useRouter();



    async function handlesubmit(e){
        e.preventDefault();

        const user = {
          email:inputEmail,
          password:inputPassword
        }



        const res = await fetch("/api/signup",{
          method:"POST",
          body:JSON.stringify(user)
        })



        if(res.status==201){
          alert("Sign UP successfull")
          router.push("/")

        }

        // console.log(res)




    }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">Email</label>
            <input
              type="email"

              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={inputEmail}
              onChange={(e)=>{
                setInputEmail(e.target.value);

              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm mb-2">Password</label>
            <input
              type="password"

              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={inputPassword}
              onChange={(e)=>{
                setInputPassword(e.target.value);
              }}

            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition duration-300"
          >
            Sign Up
          </button>

        </form>
        {showError && <p className="text-center text-red-500 mt-5">{showError}</p>}
        <div className="flex items-center justify-center mt-[50px]">
                <Link href={'/login'} className=" text-sky-500 text-center">Login Your Account</Link>
                </div>
      </div>
    </div>
  );
}
