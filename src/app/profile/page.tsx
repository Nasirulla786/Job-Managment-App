//@ts-nocheck
'use client'
import LogoutBtn from "@/components/LogoutBtn";
import { useRouter } from "next/navigation";

export default function ConfirmLogoutPage() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl max-w-md w-full text-white text-center">
        <h1 className="text-2xl font-bold text-cyan-400 mb-4">
          Confirm Logout
        </h1>
        <p className="mb-6 text-gray-300">
          Are you sure you want to logout from your account?
        </p>

        <div className="flex justify-center gap-4">
          {/* Yes, Logout */}
          <LogoutBtn />

          {/* Cancel */}
          <button
            onClick={() => router.back()}
            className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition duration-300 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
