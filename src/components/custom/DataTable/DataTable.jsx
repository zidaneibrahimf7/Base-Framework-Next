'use client'

import { useState } from "react"
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

import {
     flexRender,
     getCoreRowModel,
     getSortedRowModel,
     getPaginationRowModel,
     useReactTable
   } from "@tanstack/react-table"

import {
     Table,
     TableBody,
     TableCell,
     TableHead,
     TableHeader,
     TableRow,
   } from "@/components/ui/table"

import { Pagination } from "./Pagination/pagination";
   
export default function DataTable({
     data,
     className,
     columns,
     isLoading,
     error,
     sorting,
     onSortingChange,
     pagination,
     onPaginationChange,
     rowEachPage
   
}){
     const initialState = {}
     if (pagination) initialState["pagination"] = pagination
     if (sorting) initialState["sorting"] = sorting

     const table = useReactTable({
          data,
          columns,
          manualPagination: true,
          // rowCount: data?.content?.count,
          // data: data?.content?.results || [],
          enableSortingRemoval: false,
          // autoResetPageIndex: false,
          // autoResetSortBy: false,
          getCoreRowModel: getCoreRowModel(),
          getSortedRowModel: getSortedRowModel(),
          // getPaginationRowModel: getPaginationRowModel(),
          onSortingChange,
          // onPaginationChange,
          state: initialState
        })
      

     return (
          <div className={className}>
               <div className="rounded-md border">
                    <Table>
                         <TableHeader>
                              {table.getHeaderGroups().map((headerGroup) => (
                                   <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                             return (
                                                  <TableHead key={header.id}>
                                                       {header.isPlaceholder ? 
                                                            null 
                                                            : <div
                                                                 className={
                                                                      header.column.getCanSort()
                                                                      ? 'cursor-pointer select-none flex items-center gap-1'
                                                                      : ''
                                                                 }
                                                                 onClick={header.column.getToggleSortingHandler()}
                                                                 title={
                                                                      header.column.getCanSort()
                                                                        ? header.column.getNextSortingOrder() === 'asc'
                                                                          ? 'Sort ascending'
                                                                          : header.column.getNextSortingOrder() === 'desc'
                                                                            ? 'Sort descending'
                                                                            : 'Clear sort'
                                                                        : undefined
                                                                    }                                        
                                                            >
                                                                 {flexRender(
                                                                      header.column.columnDef.header,
                                                                      header.getContext()
                                                                 )}
                                                                  {{
                                                                      asc: <FiChevronUp />,
                                                                      desc: <FiChevronDown />,
                                                                 }[header.column.getIsSorted()] ?? null}
                                                            </div>
                                                            }
                                                  </TableHead>
                                             )
                                        })}
                                   </TableRow>
                              ))}
                         </TableHeader>
                         <TableBody>
                              {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                             <TableRow
                                                  key={row.id}
                                                  data-state={row.getIsSelected() && 'selected'}
                                             >
                                                  {row.getVisibleCells().map((cell) => (
                                                       <TableCell key={cell.id}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                       </TableCell>
                                                  ))}

                                             </TableRow>
                                        ))
                                   ) : (
                                        <TableRow>
                                             <TableCell colSpan={columns.length} className="h-24 text-center">
                                             No results.
                                             </TableCell>
                                   </TableRow>
                              )}
                         </TableBody>
                    </Table>
               </div>
               <Pagination table={table} rowEachPage={rowEachPage} />
          </div>
     ) 
}