//@ts-nocheck
import { Button, Dialog } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Editbutton = ({ job }) => {
    const [title, setTitle] = useState(job?.title)
    const [description, setDescription] = useState(job?.description)
    const [location, setLocation] = useState(job?.location)
    const [salary, setSalary] = useState(job?.salary)
    const [employment_type, setEmployment_type] = useState(job?.employment_type)
    const [job_type, setJob_type] = useState(job?.job_type)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    async function handleUpdate() {
        setLoading(true)
        const sal = Number.parseInt(salary)

        //@ts-ignore
        const data: Job = {
            title,
            description,
            location,
            salary: sal,
            employment_type,
            job_type,
        }
        const res = await fetch("http://localhost:3000/api/job/" + job.id, {
            method: "POST",
            body: JSON.stringify(data),
        })
        if (res.ok) {
            alert("Job updated successfully.")
            router.refresh();
        }
        setLoading(false)
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger >
                <Button color="blue" variant="solid" radius="full" size="3" style={{
                cursor:"pointer"

            }}>
                    Edit Job
                </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="480px" className="!bg-gradient-to-br !from-blue-50 !to-blue-100 dark:!from-blue-900 dark:!to-blue-950 !border-blue-200 dark:!border-blue-800">
                <Dialog.Title className="text-blue-900 dark:text-blue-100 text-2xl font-bold mb-2">Edit Job</Dialog.Title>
                <Dialog.Description size="2" mb="4" className="text-blue-700 dark:text-blue-300 mb-6">
                    Update the job details below and click "Update Job".
                </Dialog.Description>
                <form
                    className="space-y-5"
                    onSubmit={e => {
                        e.preventDefault()
                        handleUpdate()
                    }}
                >
                    <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Job Title</label>
                        <input
                            type="text"
                            placeholder="Enter job title"
                            className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 text-blue-900 dark:text-blue-100"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Job Description</label>
                        <textarea
                            placeholder="Enter job description"
                            className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 text-blue-900 dark:text-blue-100"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Location</label>
                        <input
                            type="text"
                            placeholder="e.g. Delhi, Mumbai"
                            className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 text-blue-900 dark:text-blue-100"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Salary (₹)</label>
                        <input
                            type="number"
                            placeholder="e.g. 50000"
                            className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 text-blue-900 dark:text-blue-100"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Employment Type</label>
                        <input
                            type="text"
                            placeholder="e.g. Full-time / Part-time"
                            className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 text-blue-900 dark:text-blue-100"
                            value={employment_type}
                            onChange={(e) => setEmployment_type(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Job Type</label>
                        <input
                            type="text"
                            placeholder="e.g. Remote / Onsite"
                            className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 text-blue-900 dark:text-blue-100"
                            value={job_type}
                            onChange={(e) => setJob_type(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-2 font-semibold text-base transition duration-300 ${loading
                            ? 'bg-blue-300 dark:bg-blue-700 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                            }`}
                    >
                        {loading ? "Updating..." : "Update Job"}
                    </Button>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default Editbutton
