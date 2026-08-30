
import { getuserFromCookies } from "@/app/helper/helper"
import prismaClient from "@/services/primsa";

export default async function Page() {
    const user = await getuserFromCookies();
    const applications = await prismaClient.application.findMany({
        where: {
            user_id: user?.id
        },
        include: {
            job: {
                include: {
                    company: {
                        include: {
                            owner: true
                        }
                    }
                }
            }
        }
    });

    if (!applications?.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white">
                <div className="bg-blue-950 rounded-2xl shadow-xl p-10 text-center">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-2">No Applications Found</h2>
                    <p className="text-blue-200">You haven't applied to any jobs yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-cyan-300 mb-10 text-center drop-shadow">Your Applied Jobs</h1>
                <div className="flex flex-col gap-8">
                    {applications.map((value) => (
                        <div
                            key={value.id}
                            className="bg-blue-950 border border-blue-700 rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-bold text-cyan-300 mb-1">
                                    {value.job.title}
                                </h2>
                                <p className="text-sm text-blue-200 mb-2">
                                    {value.job.description?.slice(0, 120) || "No description provided."}
                                </p>
                            </div>
                            <div className="text-sm text-blue-300 sm:text-right mt-2 sm:mt-0">
                                <p>
                                    <span className="font-semibold text-white">Posted By:</span>{" "}
                                    {value.job.company?.owner?.email || "N/A"}
                                </p>
                                <p>
                                    <span className="font-semibold text-white">Company:</span>{" "}
                                    {value.job.company?.companyName || "N/A"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
