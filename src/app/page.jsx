 'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex justify-center text-center items-center">
      <section>
          <div className="">
              Hello World
          </div>
          <div className="flex gap-2">
            <Button onClick={() => router.push('/login')}>Login</Button>
            <Button onClick={() => router.push('/playground')}>Playground</Button>
            <Button onClick={() => router.push('/documentation')}>Documentation</Button>
          </div>
      </section>
    </main>
  );
}