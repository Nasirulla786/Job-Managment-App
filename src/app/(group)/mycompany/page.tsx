//@ts-nocheck
import prismaClient from "@/services/primsa ";

export default async function Page() {
  const companies = await prismaClient.company.findMany({
    include: {
      owner: true,
    },
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900 dark:via-blue-950 dark:to-slate-900 text-blue-900 dark:text-blue-100 p-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700 dark:text-cyan-300 drop-shadow">
        All Registered Companies
      </h1>

      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        {companies.map((value) => (
          <div
            key={value.id}
            className="border border-blue-200 dark:border-blue-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-blue-900 dark:via-blue-950 dark:to-slate-900 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-blue-800 dark:text-cyan-300 mb-1">
                {value.companyName}
              </h2>
              <p className="text-sm text-blue-900 dark:text-blue-100 mb-2">
                {value.companyDes}
              </p>
            </div>
            <div className="text-sm text-blue-700 dark:text-blue-300 sm:text-right mt-2 sm:mt-0">
              <p className="mb-1">
                <span className="font-semibold text-blue-900 dark:text-white">Company ID:</span> {value.id}
              </p>
              <p>
                <span className="font-semibold text-blue-900 dark:text-white">Owner:</span> {value.owner.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
