
import { getuserFromCookies } from "@/app/helper/helper";
import prismaClient from "@/services/primsa";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const user = await getuserFromCookies();
    // console.log(user)


    if (!user) {
        return NextResponse.json({
            success: "false",
            message: "user not found"
        }
        )
    }



    const userID = user.id;


    // const company = await prismaClient.company.findUnique({
    //     where: {
    //         ownerID: userID
    //     }
    // })


    const data = user

    // console.log("this is data which is unique",data);


    return NextResponse.json({
        success: true,
        user: data
    }

    )







}
