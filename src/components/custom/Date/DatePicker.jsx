'use client'

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


export function DatePicker({
     date,
     onChange,
     placeholder,
     className,
     formatLabel,
     widthTrigger,
     ...props
}) {
     const formatLab = formatLabel ? formatLabel : 'yyyy-MM-dd'

     return (
          <div className={className}>
               <Popover>
                    <PopoverTrigger asChild>
                         <Button
                              variant="outline"
                              className={cn(
                                   `${widthTrigger ? widthTrigger : 'w-full'} flex justify-between font-normal`,
                                   !date && "text-muted-foreground"
                              )}
                         >
                              {date ? format(date, formatLab) : <span>{placeholder ? placeholder : "Pick a date"}</span>}
                              <CalendarIcon size={17} />
                         </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                         <Calendar 
                              mode="single"
                              selected={date}
                              captionLayout="dropdown-buttons"
                              onSelect={onChange}
                              initialFocus
                              fromYear={1900}
                              toYear={moment().format('YYYY')}
                              {...props}
                         />
                    </PopoverContent>
               </Popover>
          </div>
     )
}