//@ts-nocheck
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const LogoutBtn = () => {
    const router = useRouter();

    async function handleLogout() {
        try {
            const res = await fetch("http://localhost:3000/api/logout");
            const data = await res.json();

            if (data.success) {
                alert("Logout Successful");
                router.push("/login"); // Optional: Redirect to login page
            } else {
                alert("Logout Failed");
            }
        } catch (error) {
            console.error("Logout Error:", error);
            alert("Something went wrong");
        }
    }

    return (
        <div className="flex justify-center">
            <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition duration-300"
            >
                Logout
            </button>
        </div>
    );
}

export default LogoutBtn;
