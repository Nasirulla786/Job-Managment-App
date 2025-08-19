//@ts-nocheck
'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Job = {
  job_id: string
  job_title: string
  employer_name: string
  employer_logo: string
  job_description: string
  job_type?: string
  company: {
    id: string
    companyName: string
    industry?: string
    owner: {
      email: string
    }
  }
  description?: string
  title?: string
  id?: string
}

const JobCard = ({ job, checkSearch }: { job: Job, checkSearch: boolean }) => {
  return (
    <div
      className={`flex flex-col justify-between border border-blue-200 dark:border-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
        ${checkSearch ? 'w-full' : 'w-[370px]'} h-[400px] p-6 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900 dark:via-blue-950 dark:to-slate-900`}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        {job.employer_logo ? (
          <Image
            src={job.employer_logo}
            width={56}
            height={56}
            alt="logo"
            className="w-14 h-14 rounded-xl object-contain border-2 border-blue-300 dark:border-blue-700 bg-white"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-blue-200 dark:bg-blue-700 flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold text-xl">
            {job.title?.[0] || "C"}
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 line-clamp-1">
            {job.employer_name}
          </h3>
          <span className="text-xs text-blue-600 dark:text-blue-300 font-medium">
            {job.company?.companyName || "Industry"}
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Owner: {job.company?.owner?.email}
          </span>
        </div>
      </div>

      {/* Job Title */}
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 line-clamp-1">
          {job.job_title || job.title}
        </h2>
        <span className="inline-block mt-1 text-xs bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-semibold">
          {job.job_type || "Full-time"}
        </span>
      </div>

      {/* Description */}
      <div className="flex-1 mb-4 overflow-hidden">
        <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-snug max-h-[120px] overflow-y-auto pr-1 line-clamp-5 ">
          {job.job_description?.slice(0, 220) || job.description?.slice(0, 220) || "No description provided."}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-2">
        <Link href={`/mycompany/${job.company?.id}`}>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300 hover:underline">
            {job.company?.companyName}
          </span>
        </Link>
        <Link
          href={`/detail/${job.id || job.job_id}`}
          className="text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 dark:from-blue-500 dark:to-blue-700 px-5 py-2 rounded-lg shadow transition-all"
        >
          View Job
        </Link>
      </div>
    </div>
  )
}

export default JobCard
