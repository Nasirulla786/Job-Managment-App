//@ts-nocheck

import { getuserFromCookies } from "@/app/helper/helper";
import prismaClient from "@/services/primsa ";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(req){
    const body = await req.json();

     const user = await getuserFromCookies();

    if(!user){
        return NextResponse.json({
            success:false,
            message:"unauthorized"
        })
    }


      const company = {
        companyName :body.companyName,
        companyDes :body.companyDes,
        ownerID :user.id
    }
    // console.log("this is user",user);
    try {

        const newCOm = await prismaClient.company.create({
            data:company
        })

        // console.log("newCompnay",newCOm)
           return NextResponse.json({
            success:true,
            message:"new COmp"
        })






    } catch (error) {
        // console.log(error)
               return NextResponse.json({
            success:false,
            message:"failed COmp"
        })


    }



}
