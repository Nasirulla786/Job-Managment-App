//@ts-nocheck
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import EditDelete from '@/components/edit-delete'
import ApplyJob from '@/components/ApplyJob'
import ViewJobs from '@/components/viewJobButton'

const page = async ({ params }) => {


  const { slug } = params
  const reesponse = await fetch("http://localhost:3000/api/job/" + slug)
  const data = await reesponse.json()

  let isApplied = data?.applied;
  console.log(isApplied)


  if (!data?.success) {
    notFound()
  }

  const res = data?.data

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900 dark:via-blue-950 dark:to-blue-900 text-blue-900 dark:text-blue-100 p-10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-blue-950 p-8 rounded-2xl shadow-2xl border border-blue-200 dark:border-blue-800">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          {res.employer_logo ? (
            <Image
              src={res.employer_logo}
              alt={res.employer_name}
              width={70}
              height={70}
              className="h-20 w-20 rounded-2xl object-contain border-2 border-blue-300 dark:border-blue-700 bg-white"
            />
          ) : (
            <div className="h-20 w-20 rounded-2xl bg-blue-200 dark:bg-blue-700 flex items-center justify-center text-blue-700 dark:text-blue-200 font-bold text-3xl">
              {res.employer_name?.[0] || "C"}
            </div>
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold">{res.title || res.job_title}</h1>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-base font-medium text-blue-700 dark:text-blue-300">
                {res.employer_name}
              </span>
              {res.company?.industry && (
                <span className="inline-block bg-blue-100 dark:bg-blue-800/40 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                  {res.company.industry}
                </span>
              )}
              {res.company?.companyName && (
                <span className="inline-block bg-blue-50 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">
                  {res.company.companyName}
                </span>
              )}
              {res.company?.owner?.email && (
                <span className="inline-block bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
                  Owner: {res.company.owner.email}
                </span>
              )}
              <span className="text-xs text-blue-500 dark:text-blue-300 ml-2">
                {res.res_location}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Job Description</h2>
          <p className="text-blue-900 dark:text-blue-100 text-base leading-relaxed">
            {res.description?.split('\n')[0] || "No description provided."}
          </p>
        </div>

        {/* Apply Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">


          <div className='flex flex-col gap-5'>

            {<ApplyJob job={res} apply = {isApplied} />}
            <ViewJobs job={res} />
          </div>
          {res.apply_options?.slice(1).map((opt, i) => (
            <Link
              key={i}
              href={opt.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-700 transition"
            >
              Apply via {opt.publisher}
            </Link>
          ))}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-blue-500 dark:text-blue-300 mb-2">
          <span>Posted: {res.res_posted_at}</span>
          <span>Type: {res.res_employment_type}</span>
        </div>

        <div className="mt-6">
          <EditDelete job={res} />
        </div>
      </div>
    </div>
  )
}

export default page
