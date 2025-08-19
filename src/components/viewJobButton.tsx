//@ts-nocheck
'use client'
import { Badge, Button, Dialog } from "@radix-ui/themes"
import { useEffect, useState } from "react"

export default function ViewJobs({ job }) {

    // console.log("this is viewapply jons",job)


    const [applicants, setapplicants] = useState([])

    // console.log("this is applicants", applicants)


    useEffect(() => {

        async function getApplicants() {
            const res = await fetch("/api/applicants/" + job.id)
            const data = await res.json();

            // console.log("ths is server data", data)
            if (data.success) {
                setapplicants(data?.data)
            }

            else {
                alert("nothing")
            }

        }
        getApplicants();
    }, [])

    return (



        <div>



            <Dialog.Root>
                <Dialog.Trigger>
                    <Button>View Jobs Applicants</Button>
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
