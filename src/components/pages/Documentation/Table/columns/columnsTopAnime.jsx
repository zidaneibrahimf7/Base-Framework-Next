'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { firstCase } from "@/helpers/Helpers"
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"
import moment from "moment"
import Image from "next/image"


export const columnsTopAnime = [
     {
          header: ({ column }) => {
               return (
                 <Button
                   variant="ghost"
                   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                 >
                   Anime
                   {column.getIsSorted() ? column.getIsSorted() === 'asc' ? <ArrowUp className="ml-2 h-4 w-4" /> : <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUpDown size={17} className="opacity-50 ml-2 h-4 w-4" />  }
                 </Button>
               )
             },
          size:300,
          accessorKey: 'title',
          cell: (item) => {
               const keyData = item.row.original
               // console.log(keyData)
               const imageAnime = keyData.images
               const title = keyData.title
               // const titleJapan = keyData.title_japanese
               // const titleEnglish = keyData.title_english
               return (
                    <div>
                         <div className="flex gap-2">
                              <Image src={imageAnime.jpg.image_url} className="rounded-lg" width={90} height={90} alt={title} />
                              <span className="text-sm font-bold">{title}</span>
                         </div>
                    </div>
               )
          }
     },
     {
          header: 'Source',
          accessorKey: 'source',
     },
     {
          header: 'Episode',
          size: 20,
          accessorKey: 'episodes',
     },
     {
          header: 'Status',
          accessorKey: 'status',
     },
     {
          header: 'Genre',
          size: 40,
          accessorKey: 'genres',
          cell: (item) => {
               const genres = item.getValue()
               // console.log(genre)
               return (
                    <div>
                         {
                              genres.map((v, i) => {
                                   const genreName = v.name
                                   return (
                                        <ul key={i} className="list-disc">
                                             <li>{genreName}</li>
                                        </ul>
                                   )
                              })
                         }
                    </div>
               )
          }
     },
     {
          header: 'Synopsis',
          size: 900,
          accessorKey: 'synopsis',
     },
     {
          header: 'Members',
          size: 20,
          accessorKey: 'members'
     },
     {
          header: 'Type',
          size: 20,
          accessorKey: 'type',
     },
     {
          header: 'Score',
          size: 20,
          accessorKey: 'score',
     }
]