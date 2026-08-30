// @ts-nocheck
'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const ApplyJob = ({ job, apply }) => {
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(apply);
  const [loading, setLoading] = useState(false);

  async function handleApply() {
    setLoading(true);
    setIsApplied(true);

    try {
      const res = await fetch("/api/job/apply/" + job?.id);
      const data = await res.json();

      if (data.success) {
        toast.success("Applied Successfully! 🎉");
        router.refresh();
      } else {
        toast.error(data?.message || "Something went wrong. Please try again.");
        setIsApplied(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error! Could not apply. Please try again.");
      setIsApplied(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleApply}
        disabled={isApplied || loading}
        className={`bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500
        text-white px-6 py-2 rounded-lg font-semibold shadow transition flex items-center gap-2
        ${(isApplied || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Applying...
          </>
        ) : isApplied ? (
          "✓ Applied"
        ) : (
          "Apply on Job"
        )}
      </button>
    </div>
  )
}

export default ApplyJob
