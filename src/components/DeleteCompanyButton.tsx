//@ts-nocheck
'use client'
import { UserContex } from '@/app/(group)/layout'
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';

const DeleteCompanyButton = ({ id }) => {
  const router = useRouter()
  const { user } = useContext(UserContex);
  const [loading, setLoading] = useState(false)

  if (id != user?.company?.id) return null

  async function handleDelete() {
    setLoading(true)
    try {
      const res = await fetch("/api/mycompany/" + id, {
        method: "DELETE",
        credentials: "include"
      })
      const data = await res.json();

      if (data.success) {
        toast.success("Company deleted successfully!")
        setTimeout(() => { window.location.href = ("/") }, 1200)
      } else {
        toast.error(data?.message || "Failed to delete company. Please try again.")
      }
    } catch (error) {
      toast.error("Server error! Could not delete company.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition duration-300 font-semibold cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Deleting...
        </>
      ) : (
        "Delete Company"
      )}
    </button>
  )
}

export default DeleteCompanyButton
