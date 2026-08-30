//@ts-nocheck
// 'use client'
import data from "@/data"
import prismaClient from "@/services/primsa"
export default function Page() {


    async function Kuchbhi() {
        'use server'


        const newArr = data.map((value) => {
            return ({
                title: value.job_title,
                description: value.job_description,
                location: value.job_location,
                salary: 100000
            })

        })


        // console.log(newArr)





        try {



            const res = await prismaClient.openings.createMany({ data: newArr })

        } catch (error) {
            console.log(error)

        }

    }














return(


    <div>
       <form action={Kuchbhi}>
        <button type="submit">submit</button>
       </form>
    </div>
)










}
