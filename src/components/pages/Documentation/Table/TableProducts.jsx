'use client'

import { DataTableBasic } from "@/components/custom/DataTable/DataTableBasic"
import React, {useState, useEffect} from "react"
import { columnsProducts } from "./columns/columnsProduct"
import { LoadingCustom } from "@/components/custom/Loading"


export default function TableProducts(){
     const [productLists, setProductLists] = useState({})
     const [limit, setLimit] = useState(5)

     const getAllProducts = async () => {
          const url = `/api/documentation/dummyJson/products?limit=${limit}&skip=${0}`
          // const url = 'https://dummyjson.com/products'
          const response = await fetch(url)
          // console.log(response, '::response::')
          const data = await response.json()
          // console.log(data, '::data::')
          if(response.status === 200) setProductLists(data)
     }

     useEffect(() => {
          getAllProducts()
     }, [])

     return (
          <>
          {
               'products' in productLists ?
               <DataTableBasic 
                    data={productLists?.products}
                    columns={columnsProducts}
                    className={'rounded-lg'}
               
               />
               :
               <div className="flex justify-center items-center">
                    <LoadingCustom size="90" />
               </div>

          }

          </>
     )
}