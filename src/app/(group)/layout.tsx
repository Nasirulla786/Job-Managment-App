
'use client'
import NavBar from "@/components/NavBar";
import prismaClient from "@/services/primsa";
// import { cookies } from "next/headers";
import { createContext, useEffect, useState } from "react";


export const UserContex:any = createContext(null);

export default  function Layout({ children }:{children:any}) {

    // const cooki = await cookies();
    // const email = decodeURIComponent(cooki.get("token")?.value || "")


    // const user = await prismaClient.user.findUnique({
    //     where: {
    //         email: email
    //     }
    // })


    const [user, setUser] = useState("")
    useEffect(() => {
        async function getUser() {
            const res = await fetch("http://localhost:3000/api/currentUser");
            const data = await res.json();


            if (data.success) {
                setUser(data?.user);
                // console.log(data?.user)
            }
        }

        getUser();

    }, [])




    return (
        <div>


            <UserContex.Provider value={{
                user,
                setUser
            }}>


            <NavBar  />
            <div className="h-20"></div>

            {children}

            </UserContex.Provider>
        </div>
    )
}
