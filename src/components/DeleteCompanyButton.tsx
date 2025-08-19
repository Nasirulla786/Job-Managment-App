//@ts-nocheck
'use client'
import { UserContex } from '@/app/(group)/layout'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const DeleteCompanyButton = ({ id }) => {

  const router = useRouter()
  const { user } = useContext(UserContex);
  console.log("user", user);

  if (id != user?.company?.id) return null



  async function handleDelete() {

    const res = await fetch("/api/mycompany/" + id, {
      method: "DELETE",
      credentials: "include"
    })


    const data = await res.json();


    if (data.success) {
      alert("Company delete")
      window.location.href=("/")


    }





  }
  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition duration-300 font-semibold"
    >
      Delete Company
    </button>

  )
}

export default DeleteCompanyButton
