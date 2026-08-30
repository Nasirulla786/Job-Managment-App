//@ts-nocheck
import { getuserFromCookies } from "@/app/helper/helper";
import prismaClient from "@/services/primsa";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {


    const user = await getuserFromCookies()
    const param = decodeURIComponent(params.id);
    // console.log("api id", param)

    const job = await prismaClient.openings.findUnique({
        where: {
            id: param
        },
        include:{
            company:true
        }
    })


    // console.log(job);


//     let userApplied = false;
//   if(user){


//       const application = await prismaClient.application.findMany({
//         where:{
//             jobe_id :IdleDeadline,
//             user_id:user?.id
//         }
//     })


//       if(application.length>0) userApplied  = true;
//   }




    if (job) {
        return NextResponse.json({
            success: true,
            data: job,
            applied:false
        })
    }


    else {

        return NextResponse.json({
            success: false,
            message: "na ji na"
        })

    }
}




export async function DELETE(req,{params}){

    try {

        const jobId = params.id
        const res =  await prismaClient.openings.delete({
            where:{
                id:jobId
            }
        })

        return NextResponse.json({
            success:true,
            data:res
        })

    } catch (error) {

        // console.log(error.message)
         return NextResponse.json({
            success:false,
            message:"something went worng"

    })
    }


}



export async function POST(req,{params}){
    const jobId = params.id;


    const body = await req.json();


    try {


        const  res = await prismaClient.openings.update({
            where:{
                id:jobId
            },
            data:body
        })


        return NextResponse.json({
            success:true,
            data:res
        })

    } catch (error) {

        console.log(error)

           return NextResponse.json({
            success:false,
            message:"something went worng"
        })



    }

}
