//@ts-nocheck
import prismaClient from "@/services/primsa ";

export default async function Page() {
  const companies = await prismaClient.company.findMany({
    include: {
      owner: true,
    },
  });

  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 px-4 py-10 sm:px-8">

      {/* Header */}
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1">
            Directory
          </p>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            All Registered Companies
          </h1>
        </div>
        <span className="text-xs font-medium bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 px-3 py-1.5 rounded-full">
          {companies.length} {companies.length === 1 ? "company" : "companies"}
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3 max-w-3xl mx-auto">
        {companies.map((value) => {
          const initials = value.companyName
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <div
              key={value.id}
              className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
            >
              {/* Left */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h2 className="text-[15px] font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {value.companyName}
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-2 leading-relaxed">
                    {value.companyDes}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3 sm:gap-1.5 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                  </svg>
                  <span className="font-mono">{value.id}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 dark:text-neutral-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span className="truncate max-w-[160px]">{value.owner.email}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
