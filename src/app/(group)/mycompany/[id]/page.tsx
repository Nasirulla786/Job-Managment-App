
import DeleteCompanyButton from "@/components/DeleteCompanyButton";
import JobCard from "@/components/JobCard";
import ReviewButton from "@/components/ReviewContent";
import { PageProps } from "../../detail/[slug]/page";

export default async function Page({ params }:PageProps) {
  const { id }:any = await params;

  const res = await fetch("http://localhost:3000/api/mycompany/" + id);
  const data = await res.json();
  const company = data.data;

  const res2 = await fetch("http://localhost:3000/api/review/" + id);
  const data2 = await res2.json();
  const reviews = data2.data;

  const initials = company.companyName
    .split(" ")
    .map((w:any) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 py-12 px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-5">

        {/* Hero Card */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight mb-1">
              {company.companyName}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {company.companyDes}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1.5 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
              </svg>
              Company ID
            </p>
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 font-mono truncate">
              {company.id}
            </p>
          </div>
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-1.5 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Owner
            </p>
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
              {company.owner.email}
            </p>
          </div>
        </div>

        {/* Reviews & Jobs — your existing component */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Reviews & Jobs
            </h2>
          </div>
          <div className="p-5">
            <ReviewButton company={company} reviews={reviews} />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white dark:bg-neutral-900 border border-red-200 dark:border-red-900 rounded-xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              Delete this company
            </p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
              This action is permanent and cannot be undone.
            </p>
          </div>
          <DeleteCompanyButton id={company.id} />
        </div>

      </div>
    </div>
  );
}
