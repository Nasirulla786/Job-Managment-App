import { VerifyToken } from "@/services/jsonwebtoken";
import prismaClient from "@/services/primsa";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getuserFromCookies(){
    const userCookies = await cookies();
    const token = userCookies.get("token")?.value;


    if(!token) return null;

    const data = VerifyToken(token);

    const user = await prismaClient.user.findUnique({
        where:{
          id:data.id
        },
        include:{
          company:true
        },
        omit:{
          password:true
        }
    })



    if(!user) return null

    return user;

}
