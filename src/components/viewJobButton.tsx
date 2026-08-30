//@ts-nocheck
'use client'
import { Badge, Button, Dialog } from "@radix-ui/themes"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function ViewJobs({ job }) {

    const [applicants, setapplicants] = useState([])

    useEffect(() => {

        async function getApplicants() {
            try {
                const res = await fetch("/api/applicants/" + job.id)
                const data = await res.json();

                if (data.success) {
                    setapplicants(data?.data)
                } else {
                    toast.error("Could not load applicants.")
                }
            } catch (error) {
                toast.error("Server error! Could not fetch applicants.")
            }
        }
        getApplicants();
    }, [])

    return (



        <div>



            <Dialog.Root>
                <Dialog.Trigger>
                    <Button style={{ cursor: "pointer" }}>View Jobs Applicants</Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                    <Dialog.Title>View Jobs Applicants</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Jobs Appicants
                    </Dialog.Description>

                    {
                        applicants.map((value) => {
                            return (
                                <div key={value.id}>
                                    <Badge>{value.user.email}</Badge>

                                </div>
                            )
                        })
                    }


                </Dialog.Content>
            </Dialog.Root>


        </div >
    )


}
