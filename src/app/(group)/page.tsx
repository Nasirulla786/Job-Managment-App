//@ts-nocheck
import Image from "next/image";
import data from "@/data"
import JobCard from "@/components/JobCard";
import prismaClient from "@/services/primsa ";
import ApplyJob from "@/components/ApplyJob";
import { notFound } from "next/navigation";
// import NavBar from "@/components/NavBar";
export default async function Home() {

  // console.log(data)
  // const res = await prismaClient.openings.findMany({
  //   include: {
  //     company: {
  //       include:{
  //         owner:true
  //       }
  //     }
  //   }
  // })
  // console.log("this is maha resposne",res);

  const response = await fetch("http://localhost:3000/api/job");
  const data = await response.json();
  const res = data.data;

  if(res.length==0){
     notFound()

  }






  return (
     <main className="w-screen min-h-screen bg-gradient-to-br from-slate-800 via-blue-900 to-blue-900 flex flex-col">
       <h1 className="text-2xl text-white text-center m-10 font-bold">Trending Jobs</h1>
      <div className="w-full min-h-screen p-10 flex flex-wrap gap-10 justify-center items-start">

        {res.map((value, idx) => (
          <div
            key={value.id}
            className="flex items-center justify-center flex-col"
          >

              <JobCard key={idx} job={value} data={data} />

          </div>
        ))}
      </div>
    </main>
  );
}
