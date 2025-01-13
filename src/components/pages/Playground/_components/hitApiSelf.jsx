'use client'

import { Loading } from "@/components/custom/Loading"
import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"

export default function HitApiSelf(){
     const {data, isLoading} = useQuery({
          queryKey: ['product_self'],
          queryFn: async () => {
               const url = `/api/self/product/getAllProduct`
               const response = await fetch(url)

               const result = await response.json()
               return result
          }
     })


     return (
          <>
               {
                    isLoading ?
                    <Loading />
                    :
                    <>
                    <div>
                         {/* {console.log(data, '::data')} */}
                    </div>
                    </>
               }
          </>
     )
}