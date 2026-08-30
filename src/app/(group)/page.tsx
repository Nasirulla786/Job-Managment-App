
import JobCard from "@/components/JobCard";
import { notFound } from "next/navigation";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/job");
  const data = await response.json();
  const res = data.data;

  if (res.length == 0) {
    notFound()
  }

  return (
    <main className="w-screen min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 flex flex-col">
      {/* Header section */}
      <div className="text-center pt-14 pb-6 px-4">
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-4 py-1.5 rounded-full mb-4">
          Live Opportunities
        </span>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Trending Jobs
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Browse the latest job openings posted by companies on JobVerse
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="w-full flex-1 px-6 pb-14 flex flex-wrap gap-6 justify-center items-start">
        {res.map((value: any, idx: any) => (
          <div key={value.id} className="flex items-center justify-center flex-col">
            <JobCard key={idx} job={value} checkSearch={data} />
          </div>
        ))}
      </div>
    </main>
  );
}
