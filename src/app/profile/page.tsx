//@ts-nocheck
'use client'
import LogoutBtn from "@/components/LogoutBtn";
import { useRouter } from "next/navigation";

export default function ConfirmLogoutPage() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 flex items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative bg-slate-800/60 backdrop-blur-sm border border-blue-700/40 p-8 rounded-2xl shadow-2xl max-w-md w-full text-white text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/30 to-red-600/20 border border-red-500/30 mb-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Sign Out</h1>
        <p className="mb-7 text-slate-400 text-sm leading-relaxed">
          Are you sure you want to logout from your account?<br />
          You&apos;ll need to sign in again to access your dashboard.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="bg-slate-700 hover:bg-slate-600 border border-slate-600 px-6 py-2.5 rounded-xl transition duration-300 font-semibold text-sm cursor-pointer text-slate-200"
          >
            Cancel
          </button>
          <LogoutBtn />
        </div>
      </div>
    </div>
  );
}
