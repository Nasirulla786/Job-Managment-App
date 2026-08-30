//@ts-nocheck
'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Page() {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    async function handlesubmit(e) {
        e.preventDefault();
        const user = { email: inputEmail, password: inputPassword }
        setLoading(true)
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                body: JSON.stringify(user)
            })
            if (res.status == 201) {
                toast.success("Account created successfully! Welcome aboard 🎉")
                setTimeout(() => router.push("/"), 1200)
            } else {
                const data = await res.json()
                toast.error(data?.message || "Signup failed. Please try again.")
            }
        } catch (error) {
            toast.error("Server error! Could not sign up. Please try again later.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-screen min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 flex items-center justify-center px-4">
            {/* Glow orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/40 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Create account</h1>
                    <p className="text-slate-400 mt-1 text-sm">Join JobVerse and find your dream job</p>
                </div>

                {/* Card */}
                <div className="bg-slate-800/60 backdrop-blur-sm border border-blue-700/40 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handlesubmit} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/60 text-white border border-blue-700/50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-sm"
                                required
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-slate-900/60 text-white border border-blue-700/50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition text-sm"
                                required
                                value={inputPassword}
                                onChange={(e) => setInputPassword(e.target.value)}
                            />
                            <p className="text-xs text-slate-500 mt-1.5">Use at least 8 characters</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl transition duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-1 shadow-lg shadow-blue-600/30"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-blue-700/40" />
                        <span className="text-xs text-slate-500">or</span>
                        <div className="flex-1 h-px bg-blue-700/40" />
                    </div>

                    <p className="text-center text-slate-400 text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold hover:underline transition cursor-pointer">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
