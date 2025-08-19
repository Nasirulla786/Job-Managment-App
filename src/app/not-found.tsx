// app/not-found.tsx
'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
      <h1 className="text-6xl font-extrabold mb-4 text-red-500">404</h1>
      <h2 className="text-3xl font-bold mb-2">Job Not Found</h2>
      <p className="text-gray-300 mb-6 text-center max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
      >


         Add Job or Company First
      </Link>
    </div>
  )
}
