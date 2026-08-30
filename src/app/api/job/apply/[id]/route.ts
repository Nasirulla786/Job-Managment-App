//@ts-nocheck
import { getuserFromCookies } from "@/app/helper/helper";
import prismaClient from "@/services/primsa";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {

    const user = await getuserFromCookies();
    const job_id = params.id;


    if (!user) {
        return NextResponse.json({
            success: false,
            data: {
                message: "User is not applicable"
            }
        })
    }

    const appToSave = {
        user_id: user?.id,
        jobe_id: job_id
    }


    try {

        const application = await prismaClient.application.create({
            data: appToSave
        })

        //   console.log("this is server side appliaipn",application);

        return NextResponse.json({
            success: true,
            data: application
        })




    } catch (error) {

        // console.log(error)
        return NextResponse.json({
            success: false,
            data: {
                message: "faled to create appliation"
            }
        })

    }
}
