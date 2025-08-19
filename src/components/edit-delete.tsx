//@ts-nocheck
'use client'
import { UserContex } from "@/app/(group)/layout";
// import { getuserFromCookies } from "@/app/helper/helper";
import { Button } from "@radix-ui/themes";
import { useContext } from "react";
import Editbutton from "./Edit-button";
import { useRouter } from "next/navigation";

export default function EditDelete({ job  }) {

    // const  user = await getuserFromCookies()
    const router = useRouter()
    const { user } = useContext(UserContex)
    // console.log("this is user",user)
    // console.log("this is job",job)
    // console.log("this is user id:--",user?.company?.id)
    // console.log("this is company job id:--",job?.company?.id)



async    function handleDelete(){

        try {

            const res = await fetch("/api/job/" +job.id,{method:"DELETE"})
            const data = await res.json();
            if(data.success){
                alert("job delete sucessfully")
                router.push("/")

            }

            else{
                alert("sommething went wrong")
            }

        } catch (error) {

        }
    }



      if(user?.company?.id == job?.company?.id){
          return (
            <div className="flex gap-5">
                <Button style={{
                    backgroundColor: "red",
                    width:"100px",
                    height:"43px",
                    borderRadius:"30px",
                    cursor:"pointer"

                }} onClick={handleDelete}>Delete</Button>
                <Editbutton job={job}/>
            </div>
        )


      }


    else {
        return null
    }


}
