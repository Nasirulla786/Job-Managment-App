//@ts-nocheck
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const LogoutBtn = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false)

    async function handleLogout() {
        setLoading(true)
        try {
            const res = await fetch("http://localhost:3000/api/logout");
            const data = await res.json();

            if (data.success) {
                toast.success("Logged out successfully!")
                setTimeout(() => router.push("/login"), 1000)
            } else {
                toast.error("Logout failed. Please try again.")
            }
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Server error! Could not logout.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={handleLogout}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition duration-300 cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Logging out...
                    </>
                ) : (
                    "Logout"
                )}
            </button>
        </div>
    );
}

export default LogoutBtn;
