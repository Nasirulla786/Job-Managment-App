//@ts-nocheck
'use client'

import { useContext, useState } from "react"
import { Job } from "../../../../generated/prisma"
import { UserContex } from "../layout"

export default function Page() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [employment_type, setEmployment_type] = useState('')
  const [job_type, setJob_type] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useContext(UserContex)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const sal = Number.parseInt(salary)

    //@ts-ignore
    const data: Job = {
      title,
      description,
      location,
      salary: sal,
      employment_type,
      job_type,
      company_id: user.company.id
    }

    const res = await fetch("http://localhost:3000/api/job", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (res.ok) {
      alert("Job created successfully 🎉")
      setTitle('')
      setDescription('')
      setLocation('')
      setSalary('')
      setEmployment_type('')
      setJob_type('')
    }

    setLoading(false)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 dark:from-blue-900 dark:via-blue-950 dark:to-blue-900 flex items-center justify-center py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/90 dark:bg-blue-950/80 backdrop-blur-lg rounded-3xl p-10 shadow-2xl text-blue-900 dark:text-blue-100 space-y-8 border border-blue-200 dark:border-blue-800 transition-transform hover:scale-[1.01]"
      >
        <h2 className="text-4xl font-extrabold text-center text-blue-700 dark:text-blue-300 mb-8 drop-shadow-lg tracking-wide">
          🚀 Add New Job
        </h2>

        {/* Job Title */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-blue-800 dark:text-blue-200">Job Title</label>
          <input
            type="text"
            placeholder="Enter job title"
            className="w-full p-3 rounded-xl bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-blue-800 dark:text-blue-200">Job Description</label>
          <textarea
            placeholder="Enter job description"
            className="w-full p-3 rounded-xl bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-blue-800 dark:text-blue-200">Location</label>
          <input
            type="text"
            placeholder="e.g. Delhi, Mumbai"
            className="w-full p-3 rounded-xl bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Salary */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-blue-800 dark:text-blue-200">Salary (₹)</label>
          <input
            type="number"
            placeholder="e.g. 50000"
            className="w-full p-3 rounded-xl bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>

        {/* Employment Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-blue-800 dark:text-blue-200">Employment Type</label>
          <input
            type="text"
            placeholder="e.g. Full-time / Part-time"
            className="w-full p-3 rounded-xl bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
            value={employment_type}
            onChange={(e) => setEmployment_type(e.target.value)}
            required
          />
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-blue-800 dark:text-blue-200">Job Type</label>
          <input
            type="text"
            placeholder="e.g. Remote / Onsite"
            className="w-full p-3 rounded-xl bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
            value={job_type}
            onChange={(e) => setJob_type(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-4 rounded-xl font-bold text-lg transition duration-300 shadow-lg ${
            loading
              ? 'bg-blue-300 dark:bg-blue-700 cursor-not-allowed text-blue-100'
              : 'bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 dark:from-blue-500 dark:to-blue-700 text-white'
          }`}
        >
          {loading ? "⏳ Creating Job..." : "✅ Add Job"}
        </button>
      </form>
    </div>
  )
}
