'use client'

import { Button } from "@/components/ui/button"
import { ArrowLeft, HomeIcon } from "lucide-react"
import { useRouter } from "next/navigation"


export default function NotFound(){
     const router = useRouter()

     return (
          <>
               <main className="flex justify-center items-center">
                    <section className="flex gap-2">
                         <Button onClick={router.back} className="rounded-full"><ArrowLeft size={20} />Go Back</Button>
                    </section>
               </main>
          </>
     )
}