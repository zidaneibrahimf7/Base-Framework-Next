'use strict'

import React from 'react'
import {
     ColumnDef,
     getCoreRowModel,
     flexRender,
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

export function DataTableBasic({
     data,
     columns,
     className,
}){
     const table = useReactTable({
          data,
          columns,
          getCoreRowModel: getCoreRowModel(),
          columnResizeMode: 'onChange',
     })


     return (
          <div className={className}>
                <div className="rounded-md border">
                    <Table>
                         <TableHeader className="bg-primary">
                             {table.getHeaderGroups().map((headerGroup) => (
                                   <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                             return (
                                                  <TableHead key={header.id} className="text-secondary" style={{ width: `${header.getSize()}px` }}>
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