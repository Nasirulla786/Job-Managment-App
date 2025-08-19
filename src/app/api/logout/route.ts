//@ts-nocheck
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const cookieStore = cookies();
  cookieStore.delete("token");

  return NextResponse.json({
    success: true,
    message: "Logout Successful",
  });
}
