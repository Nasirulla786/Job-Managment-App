// @ts-nocheck
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { UserContex } from '@/app/(group)/layout'
import Image from 'next/image'
import logo from "../../public/logo1.png"
import { Menu, X } from 'lucide-react'

const NavBar = () => {
    const { user } = useContext(UserContex);
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);

    const router = useRouter();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (input.length == 0) return;
        if (e.key === 'Enter') {
            router.push('/search?q=' + input);
            setInput('');
            setSuggestions([]);
        }
    };

    useEffect(() => {
        async function fetchSuggestions() {
            const res = await fetch(`http://localhost:3000/api/search/suggestions?q=${input}`);
            const data = await res.json();
            if (data.success) setSuggestions(data.sugg);
        }
        if (input) fetchSuggestions();
        else setSuggestions([]);
    }, [input]);

    // Menu items for reuse
    const menuItems = (
        <>
            <Link href="/" className="text-base font-semibold text-blue-900 dark:text-blue-100 hover:text-blue-500 dark:hover:text-blue-400 transition">
                Home
            </Link>
            {!user?.company && (
                <Link href="/company" className="text-base font-semibold text-blue-900 dark:text-blue-100 hover:text-blue-500 dark:hover:text-blue-400 transition">
                    Add Company
                </Link>
            )}
            {user?.company && (
                <Link
                    href="/addjob"
                    className="px-4 py-1.5 text-base bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
                >
                    Add Job
                </Link>
            )}
            {user?.company && (
                <Link
                    href={"/mycompany/" + user.company.id}
                    className="px-4 py-1.5 text-base bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
                >
                    My Company
                </Link>
            )}
            {user?.company && (
                <Link
                    href={"/mycompany/"}
                    className="px-4 py-1.5 text-base bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition"
                >
                    All Company
                </Link>
            )}
            <Link href={"/appliedjobs"} className='text-base font-semibold text-blue-900 dark:text-blue-100 hover:text-blue-500 dark:hover:text-blue-400 transition'>
                Applied Jobs
            </Link>
            <Link
                href="/profile"
                className="px-4 py-1.5 text-base border border-blue-400 rounded-lg text-blue-900 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-900 transition"
            >
                LogOut
            </Link>
        </>
    );

    return (
       <header className="w-full h-20 bg-white dark:bg-blue-950 border-blue-200 dark:border-blue-800 shadow-lg fixed top-0 z-50 flex items-center justify-between px-4 sm:px-8 md:px-[35px]">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Image src={logo} width={60} height={60} alt="Logo" className="w-14 h-14 drop-shadow-lg" />
                <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-200 tracking-tight hidden sm:inline">JobVerse</span>
            </div>

            {/* Search Box */}
            <div className="relative w-[140px] xs:w-[180px] sm:w-[220px] md:w-[300px]">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search jobs..."
                    className="w-full px-4 py-2 rounded-xl bg-white/80 dark:bg-blue-900/80 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 text-blue-900 dark:text-blue-100 placeholder:text-blue-400 shadow"
                />
                {input && suggestions.length > 0 && (
                    <div className="absolute top-12 w-full bg-white/90 dark:bg-blue-900/90 shadow-xl rounded-xl border border-blue-200 dark:border-blue-700 z-50 max-h-60 overflow-y-auto">
                        {suggestions.map((item, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                    router.push(`/search?q=${encodeURIComponent(item.title)}`);
                                    setInput('');
                                    setSuggestions([]);
                                }}
                                className="w-full text-left px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-800 cursor-pointer text-base text-blue-900 dark:text-blue-100 truncate"
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6">
                {menuItems}
            </nav>

            {/* Mobile Hamburger */}
            <button
                className="md:hidden flex items-center justify-center text-blue-700 dark:text-blue-200 hover:text-blue-500 dark:hover:text-blue-400 transition"
                onClick={() => setMobileMenu(!mobileMenu)}
                aria-label="Toggle menu"
            >
                {mobileMenu ? <X size={32} /> : <Menu size={32} />}
            </button>

            {/* Mobile Menu Drawer */}
            {mobileMenu && (
                <div className="fixed top-20 left-0 w-full bg-white/95 dark:bg-blue-950/95 backdrop-blur-md border-t border-blue-200 dark:border-blue-800 shadow-2xl z-50 flex flex-col items-center gap-6 py-8 md:hidden animate-fade-in">
                    {menuItems}
                </div>
            )}
        </header>
    );
};

export default NavBar
