'use client';

import {
  Select as SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Select({
     trigger,
     options,
     onChange,
     width,
     height,
     ...props
}){
     return (
          <div>
               <SelectUI onValueChange={onChange} {...props}>
                    <SelectTrigger className={width ? width : "w-[180px]"}>
                         <SelectValue placeholder={trigger} />
                    </SelectTrigger>
                    <SelectContent className={`${height ? height : "max-h-[200px]"} overflow-y-scroll`}> {/* Add max height and overflow */}
                         {
                              options.map((option, index) => (
                                   <SelectItem key={index} value={option.value}>
                                        {option.label}
                                   </SelectItem>
                                   ))
                              }
                    </SelectContent>
               </SelectUI>
          </div>
     )
}
