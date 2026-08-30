// @ts-nocheck
'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CompanyForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyDes, setCompanyDes] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleForm(e) {
    e.preventDefault();
    const company = { companyName, companyDes };
    setLoading(true)
    try {
      const res = await fetch("/api/company", {
        method: "POST",
        body: JSON.stringify(company),
        headers: { "Content-Type": "application/json" }
      });

      if (res.ok) {
        toast.success("Company created successfully! 🏢")
        // Hard reload so layout re-fetches updated user with company data
        setTimeout(() => { window.location.href = "/" }, 1200)
      } else {
        const data = await res.json()
        toast.error(data?.message || "Failed to create company. Please try again.")
        setLoading(false)
      }
    } catch (error) {
      toast.error("Server error! Could not create company.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950">
      <div className="w-full max-w-[480px] bg-slate-800/60 backdrop-blur-sm border border-blue-700/40 rounded-2xl p-10 shadow-2xl">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10h2m4 0h2M8 14h2m4 0h2M8 18h2m4 0h2" />
            </svg>
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-1">
            Company Registration
          </p>
          <h1 className="text-2xl font-bold text-white">
            Create a Company
          </h1>
          <p className="text-sm text-slate-400 mt-1 text-center">
            Fill in the details below to register your organisation.
          </p>
        </div>

        <hr className="border-blue-700/40 mb-7" />

        <form onSubmit={handleForm} className="space-y-5">
          {/* Company Name */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
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
              className="w-full text-sm text-white bg-slate-900/60 border border-blue-700/50 rounded-lg px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
            />
          </div>

          {/* Company Description */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mb-1.5">
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
              className="w-full text-sm text-white bg-slate-900/60 border border-blue-700/50 rounded-lg px-3.5 py-2.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition resize-none"
            />
            <p className="text-xs text-slate-500 mt-1.5">
              A clear description helps others understand your business.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-sm font-semibold rounded-lg py-3 transition active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating company...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Submit Company
              </>
            )}
          </button>
        </form>

        <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-6">
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
