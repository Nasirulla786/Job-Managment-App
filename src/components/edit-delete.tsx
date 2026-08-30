//@ts-nocheck
'use client'
import { UserContex } from "@/app/(group)/layout";
import { Button } from "@radix-ui/themes";
import { useContext, useState } from "react";
import Editbutton from "./Edit-button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditDelete({ job }) {
    const router = useRouter()
    const { user } = useContext(UserContex)
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        setLoading(true)
        try {
            const res = await fetch("/api/job/" + job.id, { method: "DELETE" })
            const data = await res.json();
            if (data.success) {
                toast.success("Job deleted successfully!")
                setTimeout(() => router.push("/"), 1000)
            } else {
                toast.error(data?.message || "Something went wrong. Could not delete job.")
            }
        } catch (error) {
            toast.error("Server error! Could not delete job.")
        } finally {
            setLoading(false)
        }
    }

    if (user?.company?.id == job?.company?.id) {
        return (
            <div className="flex gap-5">
                <Button
                    style={{
                        backgroundColor: loading ? "#ef4444aa" : "red",
                        width: "100px",
                        height: "43px",
                        borderRadius: "30px",
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px",
                    }}
                    disabled={loading}
                    onClick={handleDelete}
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        </>
                    ) : (
                        "Delete"
                    )}
                </Button>
                <Editbutton job={job} />
            </div>
        )
    }

    return null
}
