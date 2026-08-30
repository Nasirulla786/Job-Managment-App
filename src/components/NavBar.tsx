// @ts-nocheck
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { UserContex } from '@/app/(group)/layout'
import Image from 'next/image'
import logo from "../../public/logo1.png"
import { Menu, X, Search } from 'lucide-react'

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

    const NavLinks = () => (
        <>
            <Link href="/"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                Home
            </Link>

            <Link href="/appliedjobs"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                Applied Jobs
            </Link>

            {!user?.company && (
                <Link href="/company"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                    Add Company
                </Link>
            )}

            {user?.company && (
                <>
                    <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-700 mx-1" />
                    <Link href="/addjob"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                        + Add Job
                    </Link>
                    <Link href={"/mycompany/" + user.company.id}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                        My Company
                    </Link>
                    <Link href="/mycompany/"
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                        All Companies
                    </Link>
                </>
            )}

            <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-700 mx-1" />

            <Link href="/profile"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                Profile
            </Link>
        </>
    );

    return (
        <header className="w-full h-20 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950  border-b border-neutral-200 dark:border-neutral-800 fixed top-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Image src={logo} width={20} height={20} alt="JobVerse" className="w-5 h-5 object-contain brightness-0 invert" />
                </div>
                <span className="text-[15px] font-bold text-neutral-900 dark:text-neutral-100 tracking-tight hidden sm:inline">
                    JobVerse
                </span>
            </Link>

            {/* Search */}
            <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search jobs, companies…"
                    className="w-full h-9 pl-8 pr-3 text-sm bg-neutral-100 dark:bg-neutral-800 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 focus:border-blue-500 focus:bg-white dark:focus:bg-neutral-900 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none transition-all"
                />
                {input && suggestions.length > 0 && (
                    <div className="absolute top-11 w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg z-50 overflow-hidden">
                        {suggestions.map((item, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                    router.push(`/search?q=${encodeURIComponent(item.title)}`);
                                    setInput('');
                                    setSuggestions([]);
                                }}
                                className="w-full text-left px-3.5 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 truncate flex items-center gap-2 transition-colors"
                            >
                                <Search size={12} className="text-neutral-400 flex-shrink-0" />
                                {item.title}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5">
                <NavLinks />
            </nav>

            {/* Mobile Hamburger */}
            <button
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                onClick={() => setMobileMenu(!mobileMenu)}
                aria-label="Toggle menu"
            >
                {mobileMenu ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Mobile Drawer */}
            {mobileMenu && (
                <div className="fixed top-16 left-0 w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-50 flex flex-col px-4 py-4 gap-1 md:hidden">
                    <NavLinks />
                </div>
            )}
        </header>
    );
};

export default NavBar;
