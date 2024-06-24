'use client'

import { Badge } from "@/components/ui/badge"
import { firstCase } from "@/helpers/Helpers"
import moment from "moment"
import Image from "next/image"


export const columnsProducts = [
     {
          header: 'Date Time',
          accessorKey: 'meta',
          cell: (item) => {
               const createDate = item.getValue().createdAt
               // console.log(createDate)
               return (
                    <>
                         <div>{moment.utc(createDate).format('YYYY-MM-DD hh:mm')}</div>
                    </>
               )
          }
     },
     {
          header: 'Title',
          accessorKey: 'title',
          size: 300,
          cell: (key) => {
               const keyData = key.row.original
               // console.log(keyData)
               return (
                    <>
                    <div className="flex gap-2">
                         <Image src={keyData.images[0]} width={30} height={30} alt={keyData.title} />
                         <span className="mt-2">{keyData.title}</span>
                    </div>
                    
                    </>
               )
          }
     },
     {
          header: 'Brand',
          accessorKey: 'brand',
     },
     {
          header: 'Category',
          accessorKey: 'category',
          cell: (item) => {
               return (
                    <div>
                         {firstCase(item.getValue())}
                    </div>
               )
          }
     },
     {
          header: 'Description',
          size: 700,
          accessorKey: 'description',
     },
     {
          header: 'Stock',
          accessorKey: 'stock'
     },
     {
          header: 'Price',
          accessorKey: 'price',
          cell: (item) => {
               return (
                    <>{item.getValue()} $</>
               )
          }
     },
     {
          header: 'Tags',
          accessorKey: 'tags',
          size: 100,
          cell: (item) => {
               const valueTags = item.getValue()
               return (
                    <>   
                    {
                         valueTags.map((v, i) => (
                              <div key={i} className="grid grid-cols-2 my-1">
                                   <span className="flex gap-2"><Badge>{v}</Badge></span>
                              </div>
                         ))
                    }
                    </>
               )
          }
     }
]