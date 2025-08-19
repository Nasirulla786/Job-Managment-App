//@ts-nocheck
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit() {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data = await res.json()

    if (data.success === true) {
      alert('Login successful!')
      router.push('/')
    } else {
      alert(data.message || 'Invalid credentials')
    }
  }

  return (
    <div className="w-screen h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="bg-[#1e293b] p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-8">Login</h1>

        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition duration-300"
          >
            Login
          </button>

          <div className="text-center text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
              className="text-cyan-400 hover:underline font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
