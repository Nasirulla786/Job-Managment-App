import prismaClient from "@/services/primsa";
import Link from "next/link";

export default async function Page() {
  const companies = await prismaClient.company.findMany({
    include: {
      owner: true,
    },
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 px-4 py-12 sm:px-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-1">
            Directory
          </p>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            All Registered Companies
          </h1>
        </div>
        <span className="text-xs font-medium bg-blue-500/10 text-cyan-300 border border-cyan-500/30 px-3 py-1.5 rounded-full">
          {companies.length} {companies.length === 1 ? "company" : "companies"}
        </span>
      </div>

      {/* List */}
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {companies.map((value) => {
          const initials = value.companyName
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return (
            <Link
              key={value.id}
              href={`/mycompany/${value.id}`}
              className="bg-slate-800/60 backdrop-blur-sm border border-blue-700/40 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-cyan-500/60 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
            >
              {/* Left */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white text-base font-bold flex-shrink-0 shadow-md shadow-blue-500/30">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                    {value.companyName}
                  </h2>
                  <p className="text-sm text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {value.companyDes}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3 sm:gap-1.5 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
                  </svg>
                  <span className="font-mono text-slate-300">{value.id}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                  <span className="truncate max-w-[180px] text-slate-300">{value.owner.email}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
