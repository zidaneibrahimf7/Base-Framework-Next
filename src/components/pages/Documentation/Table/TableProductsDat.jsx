'use client'

import { LoadingCustom } from '@/components/custom/Loading'
import React, {useState, useEffect} from 'react'
import DataTable from '@/components/custom/DataTable/DataTable'
import { columnsProductDatas } from './columns/columnsProductDatas'
import { useSorting } from '@/hooks/table-sorting'
import { usePagination } from '@/hooks/table-pagination'
import { columnsProducts } from './columns/columnsProduct'

export default function TableProductsDat(){
     const rowEachPage = 0
     const [productLists, setProductLists] = useState({})
     const { sortKey, sortOrder, onSortingChange, sorting } = useSorting('-title')
     // const [limit, setLimit] = useState(0)
     const {offset, limit, onPaginationChange, pagination} = usePagination(rowEachPage)

     // console.log(sortOrder)
     // console.log(offset)
     let orderVal
     if(sortOrder === -1){
          orderVal = 'desc'
     } else {
          orderVal = 'asc'
     }

     const getAllProducts = async () => {
          const url = `/api/documentation/dummyJson/products?limit=${limit}&skip=${offset}&sortBy=${sortKey}&order=${orderVal}`
          // const url = 'https://dummyjson.com/products'
          const response = await fetch(url)
          // console.log(response, '::response::')
          const data = await response.json()
          // console.log(data, '::data::')
          // const {products, total, skip, limit} = data
          if(response.status === 200) setProductLists(data)
     }

     useEffect(() => {
          getAllProducts()
     }, [sortKey, sortOrder])

     return (
          <>
          {
               // console.log(sorting, onSortingChange, '::sort::')
          }
          {
               'products' in productLists ?
               <DataTable 
                    data={productLists?.products}
                    columns={columnsProducts}
                    // error={error}
                    sorting={sorting}
                    onSortingChange={onSortingChange}
                    pagination={pagination}
                    onPaginationChange={onPaginationChange}
                    rowEachPage={rowEachPage}
               />
               :
               <div className="flex justify-center items-center">
                    <LoadingCustom size="90" />
               </div>
          }
          </>
     )
}