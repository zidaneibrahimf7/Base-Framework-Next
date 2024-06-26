'use client'

import { LoadingCustom } from '@/components/custom/Loading'
import React, {useState, useEffect} from 'react'
import DataTable from '@/components/custom/DataTable/DataTable'
import { useSorting } from '@/hooks/table-sorting'
import { columnsTopAnimeDat } from './columns/columnsTopAnimeDat'
import { usePagination } from '@/hooks/table-pagination'

export default function TableAnimeTopDat(){
     const rowEachPage = 25
     const [animeTopLists, setAnimeTopLists] = useState({})
     const { sortKey, sortOrder, onSortingChange, sorting } = useSorting('-title')
     const {offset, limit, onPaginationChange, pagination} = usePagination(rowEachPage)


     const getAnimeTopList = async () => {
          const url = `/api/documentation/apiJikan/top/anime?limit=${limit}&page=${offset === 0 ? 1 : offset}`
          // const url = 'https://api.jikan.moe/v4/top/anime'
          const response = await fetch(url)
          // console.log(response, '::response::')
          const getApiData = await response.json()
          
          const {data, pagination} = getApiData
          // console.log(data, '::data::')
          if(response.status === 200) setAnimeTopLists(data)
     }

     useEffect(() => {
          getAnimeTopList()
          // getStation()
     }, [pagination])

     return (
          <>
               {
                    animeTopLists ?
                         <DataTable
                              data={animeTopLists}
                              columns={columnsTopAnimeDat}
                              sorting={sorting}
                              onSortingChange={onSortingChange}
                              pagination={pagination}
                              onPaginationChange={onPaginationChange}

                         />
                    :
                    <LoadingCustom />
               }
          </>
     )
}