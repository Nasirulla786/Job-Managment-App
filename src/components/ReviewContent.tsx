//@ts-nocheck
'use client'
import { Badge, Box, Button, Tabs, Text, TextArea } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ReviewButton({ company, reviews }) {
  const [review, setReview] = useState("");
  const router = useRouter();

  async function handleReview() {
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
      alert("Review Created");
      router.refresh();
      setReview("");
    } else {
      alert(data.message);
    }
  }

  return (
    <Tabs.Root defaultValue="jobs">
      {/* Tab Buttons */}
<Tabs.List className="mb-10 flex justify-center gap-4">
  {[
    { label: "Listed Jobs", value: "jobs" },
    { label: "Add Review", value: "addReview" },
    { label: "View Reviews", value: "viewReviews" },
  ].map((tab) => (
    <Tabs.Trigger
      key={tab.value}
      value={tab.value}
      className="px-6 py-2 text-sm font-semibold bg-sky-600 text-white rounded-md z-10
                 data-[state=active]:bg-sky-400 data-[state=active]:text-white
                 hover:bg-blue-700 hover:text-white transition shadow"
    >
      {tab.label}
    </Tabs.Trigger>
  ))}
</Tabs.List>


      <Box>
        {/* ✅ JOB LISTING */}
        <Tabs.Content value="jobs">
          <h2 className="text-2xl font-bold text-cyan-300 text-center mb-6">
            Jobs at {company.companyName}
          </h2>
          <div className="space-y-4">
            {company.jobs && company.jobs.length > 0 ? (
              company.jobs.map((job) => (
                <div
                  key={job.id}
                  className="border border-blue-700 bg-blue-950 p-5 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-cyan-200 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-blue-300 italic">
                No jobs listed for this company.
              </p>
            )}
          </div>
        </Tabs.Content>

        {/* ✅ ADD REVIEW */}
        <Tabs.Content value="addReview">
          <div className="max-w-xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-bold text-cyan-300">Add a Review</h2>
            <TextArea
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full bg-blue-900 text-white border border-cyan-400 rounded-lg focus:ring-2 focus:ring-cyan-400 min-h-[100px]"
            />
            <Button
              onClick={handleReview}
              className="bg-gradient-to-r from-cyan-400 to-blue-700 text-white font-semibold rounded-md px-8 py-2 hover:from-cyan-500 hover:to-blue-800 transition shadow"
            >
              Submit Review
            </Button>
          </div>
        </Tabs.Content>

        {/* ✅ VIEW REVIEWS */}
        <Tabs.Content value="viewReviews">
          <h2 className="text-2xl font-bold text-cyan-300 text-center mb-6">
            Company Reviews
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {reviews && reviews.length > 0 ? (
              reviews.map((value) => (
                <div
                  key={value.id}
                  className="border border-blue-700 bg-blue-950 p-4 rounded-lg shadow-sm"
                >
                  <div className="mb-2">
                    <Badge className="bg-sky-300 text-blue-900 font-semibold px-3 py-1 rounded-md">
  {value.user?.email || "Anonymous"}
</Badge>
                  </div>
                  <p className="text-blue-100 leading-relaxed">{value.content}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-blue-300 italic">No reviews yet.</p>
            )}
          </div>
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}
