//@ts-nocheck
import DeleteCompanyButton from "@/components/DeleteCompanyButton";
import JobCard from "@/components/JobCard";
import ReviewButton from "@/components/ReviewContent";

export default async function Page({ params }) {
  const { id } = await params;

  const res = await fetch("http://localhost:3000/api/mycompany/" + id);
  const data = await res.json();
  const company = data.data;

  const res2 = await fetch("http://localhost:3000/api/review/" + id);
  const data2 = await res2.json();
  const reviews = data2.data;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Company Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-cyan-400 tracking-tight">
            {company.companyName}
          </h1>
          <p className="text-lg text-slate-200 max-w-3xl mx-auto">
            {company.companyDes}
          </p>
        </div>

        {/* Company Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-sm text-cyan-300 uppercase mb-1">Company ID</p>
            <p className="text-xl font-semibold">{company.id}</p>
          </div>
          <div>
            <p className="text-sm text-cyan-300 uppercase mb-1">Owner Email</p>
            <p className="text-xl font-semibold">{company.owner.email}</p>
          </div>
        </div>

        {/* Reviews and Jobs Section */}
        <div className="mt-8">
          <ReviewButton company={company} reviews={reviews} />
        </div>

        {/* Delete Button */}
        <div className="flex justify-center pt-8">
          <DeleteCompanyButton id={company.id} />
        </div>
      </div>
    </div>
  );
}
