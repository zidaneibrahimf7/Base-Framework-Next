'use client'

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, HomeIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function NotFound(){
     const router = useRouter()

     return (
          <>
               <main className="flex justify-center items-center min-h-screen">
                    <section className="">
                         <Image src='/assets/404-error.jpg' width={400} height={400} alt="NtotFound" />
                         <h1 className="italic flex justify-center my-3 text-2xl">oops.. something was wrong ⚠️ </h1>
                         <div className="flex justify-center items-center gap-2">
                              <Button onClick={() => router.back()} className="rounded-full gap-2"><ArrowLeft size={20} />Previous Page</Button>
                              <Button variant="" onClick={() => router.push('/')} className="rounded-full gap-2"><Home size={20} />Go Home</Button>
                         </div>
                    </section>
               </main>
          </>
     )
}