// @ts-nocheck
'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDes, setCompanyDes] = useState('');
  const router = useRouter();

  async function handleForm(e) {
    e.preventDefault();

    const company = { companyName, companyDes };

    await fetch("/api/company", {
      method: "POST",
      body: JSON.stringify(company),
      headers: { "Content-Type": "application/json" }
    });

    router.push("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-50 dark:bg-neutral-950">
      <div className="w-full max-w-[480px] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-10 shadow-sm">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10h2m4 0h2M8 14h2m4 0h2M8 18h2m4 0h2" />
            </svg>
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 mb-1">
            Company Registration
          </p>
          <h1 className="text-2xl font-serif font-normal text-neutral-900 dark:text-neutral-100">
            Create a Company
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 text-center">
            Fill in the details below to register your organisation.
          </p>
        </div>

        <hr className="border-neutral-100 dark:border-neutral-800 mb-7" />

        <form onSubmit={handleForm} className="space-y-5">

          {/* Company Name */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. Acme Corporation"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-full text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3.5 py-2.5 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition"
            />
          </div>

          {/* Company Description */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              Company Description
            </label>
            <textarea
              placeholder="What does your company do? Describe your mission, products, or services..."
              value={companyDes}
              onChange={(e) => setCompanyDes(e.target.value)}
              rows={5}
              required
              className="w-full text-sm text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-3.5 py-2.5 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition resize-none"
            />
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1.5">
              A clear description helps others understand your business.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-lg py-2.5 transition active:scale-[0.99]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Submit Company
          </button>
        </form>

        <p className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-600 mt-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          Your data is stored securely
        </p>

      </div>
    </div>
  );
};

export default CompanyForm;
