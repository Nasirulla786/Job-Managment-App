//@ts-nocheck
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const Sidebar = () => {
    const params = useSearchParams();
    const q = params.get("q") || "";
    const [min, setMin] = useState("");
    const router = useRouter();

    function handleFilter() {
        let url = `/search?q=${q}`;
        if (min > 0) {
            url += `&min=${min}`;
        }
        router.push(url);
    }

    return (
        <div className="h-[70%] w-[300px] bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 rounded-2xl shadow-xl text-white flex flex-col items-center gap-10 p-8 border border-blue-700">
            <div className="flex flex-col items-center w-full">
                <h1 className="font-bold text-cyan-300 text-lg mb-6 tracking-wide">Salary Filter</h1>
                <input
                    type="number"
                    placeholder="Minimum salary"
                    className="w-full p-4 rounded-lg bg-blue-950 border border-blue-700 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                    value={min}
                    onChange={(e) => setMin(Number(e.target.value))}
                />
            </div>
            <button
                onClick={handleFilter}
                className="w-full p-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-semibold shadow hover:from-cyan-600 hover:to-blue-800 transition"
            >
                Apply Filter
            </button>
        </div>
    );
};

export default Sidebar;
