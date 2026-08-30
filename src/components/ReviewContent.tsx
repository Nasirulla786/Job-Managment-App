//@ts-nocheck
'use client'
import { Badge, Box, Button, Tabs, TextArea } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ReviewButton({ company, reviews }) {
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleReview() {
    if (!review.trim()) {
      toast.error("Please enter a review.");
      return;
    }

    setLoading(true);
    try {
      const dat = {
        content: review,
        company_id: company.id,
      };

      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dat),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Review Submitted Successfully! ⭐");
        router.refresh();
        setReview("");
      } else {
        toast.error(data.message || "Failed to submit review.");
      }
    } catch (error) {
      toast.error("Server error! Could not post review.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Tabs.Root defaultValue="jobs">
      {/* Tab Buttons */}
      <Tabs.List className="mb-8 flex justify-center gap-3">
        {[
          { label: "Listed Jobs", value: "jobs" },
          { label: "Add Review", value: "addReview" },
          { label: "View Reviews", value: "viewReviews" },
        ].map((tab) => (
          <Tabs.Trigger
            key={tab.value}
            value={tab.value}
            className="px-5 py-2 text-sm font-semibold rounded-xl cursor-pointer text-slate-300
                       data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white
                       hover:bg-slate-700/60 transition-all shadow-md"
          >
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Box>
        {/* ✅ JOB LISTING */}
        <Tabs.Content value="jobs">
          <h2 className="text-xl font-bold text-cyan-300 text-center mb-6">
            Jobs at {company.companyName}
          </h2>
          <div className="space-y-4">
            {company.jobs && company.jobs.length > 0 ? (
              company.jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-blue-700/40 bg-slate-900/60 p-5 rounded-xl shadow-md hover:border-cyan-500/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 italic">
                No jobs listed for this company yet.
              </p>
            )}
          </div>
        </Tabs.Content>

        {/* ✅ ADD REVIEW */}
        <Tabs.Content value="addReview">
          <div className="max-w-xl mx-auto text-center space-y-5">
            <h2 className="text-xl font-bold text-cyan-300">Add a Review</h2>
            <TextArea
              placeholder="Write your experience or review about this company..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full bg-slate-900/80 text-white border border-blue-700/50 rounded-xl focus:ring-2 focus:ring-cyan-400 min-h-[120px] p-3 text-sm placeholder:text-slate-500"
            />
            <Button
              onClick={handleReview}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-xl px-8 py-2.5 transition shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 mx-auto"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </div>
        </Tabs.Content>

        {/* ✅ VIEW REVIEWS */}
        <Tabs.Content value="viewReviews">
          <h2 className="text-xl font-bold text-cyan-300 text-center mb-6">
            Company Reviews
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {reviews && reviews.length > 0 ? (
              reviews.map((value) => (
                <div
                  key={value.id}
                  className="border border-blue-700/40 bg-slate-900/60 p-5 rounded-xl shadow-md"
                >
                  <div className="mb-2">
                    <Badge className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold px-3 py-1 rounded-lg text-xs">
                      {value.user?.email || "Anonymous User"}
                    </Badge>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed mt-2">{value.content}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 italic">No reviews yet. Be the first to add one!</p>
            )}
          </div>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
