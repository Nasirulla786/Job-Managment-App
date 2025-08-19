//@ts-nocheck
import React from 'react'
import data from '@/data'
import JobCard from '@/components/JobCard'
import Sidebar from '@/components/Sidebar'
import prismaClient from '@/services/primsa '
import SearchJobCard from '@/components/SearchjobCard'

const page = async ({ searchParams }) => {
    const params = searchParams.q
    const min = searchParams.min

    let jobs;
    try {
        const res = await fetch(`http://localhost:3000/api/search?q=${params}&min=${min}`)
        const dat = await res.json()
        jobs = dat.data;
    } catch (error) {
        return console.log("this is fetching error", error);
    }

    return (
        <div className="w-full min-h-screen flex flex-col md:flex-row bg-slate-800">
            {/* Sidebar */}
            <div className="w-full md:w-[320px] flex-shrink-0 md:h-screen bg-slate-900 border-b-2 md:border-b-0 md:border-r-2 border-slate-700 flex items-center justify-center fixed md:static z-20">
                <Sidebar />
            </div>

            <div className='h-[300px]'>

            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col gap-10 min-h-screen md:ml-[320px] p-4 sm:p-8 bg-slate-800">
                {jobs?.length > 0 ? (
                    jobs.map((value, idx) => (
                        <div key={idx} >
                            {/* <JobCard checkSearch={true} job={value} /> */}
                            <SearchJobCard job={value} />
                        </div>
                    ))
                ) : (
                    <div className="text-center text-blue-200 text-lg mt-10">
                        No jobs found for your search.
                    </div>
                )}
            </div>
        </div>
    )
}

export default page
