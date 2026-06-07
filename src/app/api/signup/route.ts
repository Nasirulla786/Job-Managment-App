//@ts-nocheck
import { GenerateToken } from "@/services/jsonwebtoken";
import prismaClient from "@/services/primsa ";
import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

export async function POST(req) {
  const body = await req.json();

  const userToCreate = {
    email: body.email,
    password: body.password,
  };

  try {
    const user = await prismaClient.user.create({
      data: userToCreate,
    });

    const tokenDetail = {
      id: user.id,
    };

    const token = GenerateToken(tokenDetail);

    const res = NextResponse.json(
      {
        data: user,
      },
      { status: 201 },
    );
    res.cookies.set("token", token);

    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 },
    );
  }
}
