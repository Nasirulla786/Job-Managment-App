
import React from 'react'
import SearchJobCard from '@/components/SearchjobCard'
import Sidebar from '@/components/Sidebar'
import { PageProps } from '../detail/[slug]/page'

const page = async ({ searchParams } :{searchParams:any}) => {
  const params = searchParams.q
  const min = searchParams.min

  let jobs
  try {
    const res = await fetch(`http://localhost:3000/api/search?q=${params}&min=${min}`)
    const dat = await res.json()
    jobs = dat.data
  } catch (error) {
    console.log("this is fetching error", error)
  }

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 text-white">

      {/* Sidebar */}
      <aside className="w-full md:w-[300px] flex-shrink-0 md:h-screen bg-slate-900 border-b-2 md:border-b-0 md:border-r border-slate-700 fixed md:static z-20 shadow-lg">
        <Sidebar />
      </aside>

      {/* Spacer for fixed sidebar on mobile */}
      <div className="h-[70px] md:hidden"></div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-8 min-h-screen md:ml-[300px] p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-sky-400 drop-shadow-md text-center md:text-left">
          🔍 Search Results
        </h1>

        {jobs?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((value:any, idx:any) => (
              <SearchJobCard key={idx} job={value} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <p className="text-lg text-sky-300 font-semibold">
              No jobs found for your search.
            </p>
            <p className="text-sm text-slate-400 mt-2">
              Try adjusting filters or keywords.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default page
