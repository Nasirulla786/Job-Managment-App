//@ts-nocheck
import prismaClient from "@/services/primsa";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get("q") || "";

  const minParam = searchParams.get("min");
  const ms = parseInt(minParam);
  const validMin = !isNaN(ms) ? ms : 0;

  try {
    const data = await prismaClient.openings.findMany({
      where: {
        title: {
          contains: q,
          mode: "insensitive",
        },
        salary: {
          gte: validMin,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json({
      success: false,
      message: "Error fetching jobs",
    });
  }
}
