'use client'

import { DataTableMid } from '@/components/custom/DataTable/DataTableMid'
import { LoadingCustom } from '@/components/custom/Loading'
import React, {useState, useEffect} from 'react'
import { columnsTopAnime } from './columns/columnsTopAnime'

export default function TableAnime(){
     const [animeTopLists, setAnimeTopLists] = useState({})

     const getAnimeTopList = async () => {
          const url = '/api/documentation/apiJikan/top/anime'
          // const url = 'https://api.jikan.moe/v4/top/anime'
          const response = await fetch(url)
          // console.log(response, '::response::')
          const getApiData = await response.json()
          
          const {data, pagination} = getApiData
          // console.log(data, '::data::')
          if(response.status === 200) setAnimeTopLists(data)
     }

     // const getStation = async () => {
     //      const url = '/api/documentation/krl'
     //      const response = await fetch(url)
     //      // console.log(response, ";statuo:")
     //      const getApiData = await response.json()
     //      console.log(getApiData, ";statuo:")

     //      // console.log(getApiData)

     // }

     useEffect(() => {
          getAnimeTopList()
          // getStation()
     }, [])

     return (
          <>
               {
                    animeTopLists ?
                         <DataTableMid 
                              data={animeTopLists}
                              columns={columnsTopAnime}
                              isSearch={true}
                              searchBy={'title'}

                         />
                    :
                    <LoadingCustom />
               }
          </>
     )
}