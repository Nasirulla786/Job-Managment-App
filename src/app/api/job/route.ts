

import { getuserFromCookies } from "@/app/helper/helper";
import prismaClient from "@/services/primsa";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {


  const body = await req.json();


  console.log("thisis body",body)

  // const dataToSave = {
  //     ...body,
  //     company_id :user?company?.id
  // }


  try {



    const data = await prismaClient.openings.create({
      data: body
    })


    // console.log("This is data",data)
    return NextResponse.json({
      success: true,
      message: "Add SUccessfully"
    })

  } catch (error) {
    // console.log(error)
    return NextResponse.json({
      success: false,
      message: "Not Add"
    })

  }






}


export async function GET() {

  try {

    const res = await prismaClient.openings.findMany({
      include: {
        company: {
          include: {
            owner: true
          }
        }
      }
      // , orderBy: {
      //   createdAt: 'desc'
      // }
    })

    if (res) {
      return NextResponse.json({
        success: true,
        data: res
      })


    }


    else {
      return NextResponse.json({
        success: false,
        message: "noting"
      })
    }

  } catch (error) {
    console.log(error)

  }
}
