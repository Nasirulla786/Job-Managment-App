//@ts-nocheck
import prismaClient from "@/services/primsa ";
import { NextResponse } from "next/server";

export async function GET(req){
    const sp = req.nextUrl.searchParams;
    const q = sp.get("q");

    if(!q){
        return{
            success:true,
            suggestions:[]
        }
    }
    const sugg = await prismaClient.openings.findMany({
        where:{

            title:{
                contains:q,
                mode:"insensitive"
            }
        }
        ,
        select:{
            id:true,
            title:true
        }
        ,take :10
    })

return NextResponse.json({
    success:true,
    sugg :sugg
})





}
