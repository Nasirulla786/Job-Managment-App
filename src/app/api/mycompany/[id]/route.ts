//@ts-nocheck
import { getuserFromCookies } from "@/app/helper/helper"
import prismaClient from "@/services/primsa"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {

    const { id } = await params


    const company = await prismaClient.company.findUnique({
        where: {
            id: id
        }, include: {
            owner: true,
            jobs: true
        }
    })




    // const owner = await prismaClient.user.findUnique({
    //     where: {
    //         id: company?.ownerID
    //     }
    // })


    return NextResponse.json({
        success: true,
        data: company
    })
}


export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const user = await getuserFromCookies();

    const company = await prismaClient.company.findUnique({
      where: { id },
      include: { jobs: true },
    });

    if (user?.company?.id !== id || !company) {
      return NextResponse.json(
        { success: false, message: "Not authorized or company not found" },
        { status: 403 }
      );
    }

    const openingIds = company.jobs.map((job) => job.id);

    // Step 1: Delete applications for all openings
    await prismaClient.application.deleteMany({
      where: {
        jobe_id: { in: openingIds },
      },
    });
+
    // Step 2: Delete openings
    await prismaClient.openings.deleteMany({
      where: {
        company_id: id,
      },
    });

    // Step 3: Delete company
    await prismaClient.company.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE company error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
