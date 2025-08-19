// @ts-nocheck
'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ApplyJob = ({ job, apply }) => {
  const router = useRouter();
  const [isApplied, setIsApplied] = useState(apply); // ✅ Store prop in state

  async function handleApply() {
    setIsApplied(true); // Disable immediately

    try {
      const res = await fetch("/api/job/apply/" + job?.id);
      const data = await res.json();

      if (data.success) {
        alert("Applied Successfully");
        router.refresh();
      } else {
        alert("Something Went Wrong");
        setIsApplied(false); // Re-enable if failed
      }
    } catch (error) {
      console.error(error);
      setIsApplied(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={handleApply}
        disabled={isApplied} // ✅ Disable from state
        className={`bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500
        text-white px-6 py-2 rounded-lg font-semibold shadow transition
        ${isApplied ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isApplied ? "Applied" : "Apply on Job"}
      </button>
    </div>
  )
}

export default ApplyJob
