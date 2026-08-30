'use client'

import { useContext, useState } from "react"
import { Job } from "../../../../generated/prisma"
import { UserContex } from "../layout"
import toast from "react-hot-toast"

export default function Page() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [employment_type, setEmployment_type] = useState('')
  const [job_type, setJob_type] = useState('')
  const [loading, setLoading] = useState(false)

  const { user }: any = useContext(UserContex)

  async function handleSubmit(e: any) {
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
      //@ts-ignore
      company_id: user?.company?.id
    }

    try {
      const res = await fetch("http://localhost:3000/api/job", {
        method: "POST",
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast.success("Job created successfully! 🎉")
        setTitle('')
        setDescription('')
        setLocation('')
        setSalary('')
        setEmployment_type('')
        setJob_type('')
      } else {
        toast.error("Failed to create job. Please try again.")
      }
    } catch (error) {
      toast.error("Server error! Could not create job.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 flex items-center justify-center py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-slate-800/60 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-2xl text-white space-y-6 border border-blue-700/40"
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/30 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Post a New Job
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Publish an open role for your company on JobVerse
          </p>
        </div>

        {/* Job Title */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Senior Frontend Engineer"
            className="w-full p-3 rounded-xl bg-slate-900/60 border border-blue-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Job Description */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Job Description</label>
          <textarea
            placeholder="Describe the responsibilities, qualifications, and role expectations..."
            className="w-full p-3 rounded-xl bg-slate-900/60 border border-blue-700/50 text-white placeholder:text-slate-500 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Location & Salary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Location</label>
            <input
              type="text"
              placeholder="e.g. Delhi, Remote"
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-blue-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Salary (₹)</label>
            <input
              type="number"
              placeholder="e.g. 80000"
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-blue-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Employment Type & Job Type Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Employment Type</label>
            <input
              type="text"
              placeholder="e.g. Full-time"
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-blue-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
              value={employment_type}
              onChange={(e) => setEmployment_type(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">Job Type</label>
            <input
              type="text"
              placeholder="e.g. Remote / Hybrid"
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-blue-700/50 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm"
              value={job_type}
              onChange={(e) => setJob_type(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-4 rounded-xl font-semibold text-base transition duration-300 shadow-lg shadow-blue-600/30 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating Job...
            </>
          ) : (
            "Publish Job Opening"
          )}
        </button>
      </form>
    </div>
  )
}
