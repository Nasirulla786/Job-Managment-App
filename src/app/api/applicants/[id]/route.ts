
import prismaClient from "@/services/primsa "
import { NextResponse } from "next/server"

export async function GET (req:any,{params}:{params:any}){

    const job_id = params.id



    try {

        const res = await  prismaClient.application.findMany({
            where:{
                jobe_id :job_id
            },
            include:{
                user:true
            }

        })

        if(res){

              return NextResponse.json({
            success:true,
            data:res
        })

        }


        else{

               return NextResponse.json({
            success:false,
            data:{
                message:"falana dimkana"
            }
        })
        }



    } catch (error) {


        // console.log(error)
        return NextResponse.json({
            success:false,
            data:{
                message:"Something went worng"
            }
        })
    }
}
