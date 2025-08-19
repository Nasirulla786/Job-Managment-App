//@ts-nocheck

import { getuserFromCookies } from "@/app/helper/helper";
import prismaClient from "@/services/primsa ";
import { NextResponse } from "next/server";


export async function POST(req){
    const body = await req.json()
    const user = await getuserFromCookies();
    const dataToSave = {
        ...body,
        user_id:user.id

    }


    try {
        const reiview = await prismaClient.review.create({
            data:dataToSave
        })


        return NextResponse.json({
            success:true,
            data:reiview
        })

    } catch (error) {
        return NextResponse.json({
            success:true,
           message:"Something went wrong"
        })

    }
}
