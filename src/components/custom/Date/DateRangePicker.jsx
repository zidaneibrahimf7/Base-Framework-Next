'use client'

import React from 'react'
import { format } from "date-fns"
import moment from "moment"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateRangePicker({
     date,
     onChange,
     range,
     formatLabel,
     className,
     widthTrigger,
     placeholder,
     ...props
}){

     const formatLab = formatLabel ? formatLabel : "yyyy-MM-dd"
     let now = new Date

     let rangeDataCalendar = { 'min': 1, 'max': 30 }
     if (range === 'weekly') rangeDataCalendar = { 'min': 1, 'max': 7 }
     if (range === 'report') rangeDataCalendar = { 'min': 1, 'max': 15 }

     return (
          <div className={cn("grid gap-2", className)}>
               <Popover>
                    <PopoverTrigger asChild>
                    <Button
                              variant="outline"
                              className={cn(
                                   `${widthTrigger ? widthTrigger : 'w-full'} flex justify-between font-normal`,
                                   !date && "text-muted-foreground"
                              )}
                         >
                              { date ? (
                                   date?.from ? (
                                   date.to ? (
                                        <>
                                        {format(date.from, formatLab)} - {" "}
                                        {format(date.to, formatLab)}
                                        </>
                                        ) : (
                                             format(date.from, formatLab)
                                        )
                                   ) : (
                                   <span>{placeholder ? placeholder : "Pick a date"}</span>
                                   )
                              ) : (
                                   <span>{placeholder ? placeholder : "Pick a date"}</span>
                              )
                              }
                               <CalendarIcon size={17} />
                         </Button>
                         </PopoverTrigger>
                         <PopoverContent className="w-auto p-0">
                              <Calendar 
                                   mode='range'
                                   selected={date}
                                   initialFocus
                                   captionLayout="dropdown-buttons"
                                   defaultMonth={new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5)}
                                   onSelect={onChange}
                                   max={rangeDataCalendar.max}
                                   numberOfMonths={2}
                                   fromYear={1900}
                                   toYear={moment().format('YYYY')}
                              
                              />
                         </PopoverContent>
               </Popover>
          </div>
     )
}