'use strict'

import React, {useState} from 'react'
import {
     ColumnDef,
     getCoreRowModel,
     columnsFiltersState,
     flexRender,
     getSortedRowModel,
     getFilteredRowModel,
     getPaginationRowModel,
     sortingState,
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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DataTableMid({
     data,
     columns,
     className,
     isSearch,
     searchBy,
}){

     const [sorting, setSorting] = useState([])
     const [columnFilters, setColumnFilters] = useState([])

     const table = useReactTable({
          data,
          columns,
          getCoreRowModel: getCoreRowModel(),
          columnResizeMode: 'onChange',
          onSortingChange: setSorting,
          getSortedRowModel: getSortedRowModel(),
          onColumnFiltersChange: setColumnFilters,
          getFilteredRowModel: getFilteredRowModel(),
          state: {
            sorting,
            columnFilters,
          },
          sortDescFirst: false
     })


     return (
          <div className={className}>
               {
                    isSearch ?
                    <div className="flex items-center py-4">
                         <Input
                              placeholder="search...."
                              value={(table.getColumn(searchBy)?.getFilterValue()) ?? ""}
                              onChange={(event) =>
                              table.getColumn(searchBy)?.setFilterValue(event.target.value)
                              }
                              className="max-w-sm"
                         />
                    </div>
                    :
                    false
               }
                <div className="rounded-md border">
                    <Table>
                         <TableHeader>
                             {table.getHeaderGroups().map((headerGroup) => (
                                   <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                             return (
                                                  <TableHead key={header.id} style={{ width: `${header.getSize()}px` }}>
                                                       {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                 header.column.columnDef.header,
                                                                 header.getContext()
                                                            )}
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
          </div>
     )
}