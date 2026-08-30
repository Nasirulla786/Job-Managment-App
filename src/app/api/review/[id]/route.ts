//@ts-nocheck
import prismaClient from "@/services/primsa";
import { NextResponse } from "next/server";

//@ts-nocheck
export async function GET(req , {params}){


    const companyId = params.id;


    try {

        const review = await  prismaClient.review.findMany({
            where:{
                company_id :companyId
            },
            include:{
                user:true
            }
        })


          return NextResponse.json({
            success:true,
            data:review
        })





    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:"something went worong"
        })

    }

}
