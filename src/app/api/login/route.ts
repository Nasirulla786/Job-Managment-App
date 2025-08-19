//@ts-nocheck
import {GenerateToken} from "@/services/jsonwebtoken"
import prismaClient from "@/services/primsa "
// import { redirect } from "next/navigation";
import { NextResponse } from "next/server"

export async function POST(req){

    const {email, password} = await req.json()

    const user = await prismaClient.user.findUnique({
        where:{
            email
        }
    })
    const userToken = {
        id :user?.id
    }
    if(user?.password == password){

        const token = GenerateToken(userToken)
        // if(!token){
        //     console.log("hayini merhe hyno")
        //     return NextResponse.json({message: "nayi bhai tere bs ka ni hai"})
        // }
        const res = NextResponse.json({
            success:true,
            user
        });


        res.cookies.set("token",token)
        // redirect("/")
        // alert("login sucessfully")

        return res;
    }


    return NextResponse.json({
        success:false

    },{status: 500})


}
