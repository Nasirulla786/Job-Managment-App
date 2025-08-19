//@ts-nocheck
import { NextResponse } from "next/server";

export default function  middleware(req){
     const user = req.cookies.get("token")?.value;
     const pathName = req.nextUrl.pathname;

     const protectedPath = ['/',]


     if(protectedPath.includes(pathName)){
        if(!user){
            return NextResponse.redirect("http://localhost:3000/login");
        }
     }

     return NextResponse.next();



}
