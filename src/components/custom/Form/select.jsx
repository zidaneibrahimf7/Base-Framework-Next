import {
     Select as SelectUI,
     SelectContent,
     SelectGroup,
     SelectItem,
     SelectLabel,
     SelectTrigger,
     SelectValue,
   } from "@/components/ui/select"
import { firstCase } from "@/helpers/Helpers"
   
   export function Select ({
     options = [],
     placeholder,
     className,
     fullWidth,
     defaultValue,
     ...props
   }) {
     return (
       <SelectUI {...props} defaultValue={defaultValue}>
         <SelectTrigger className={fullWidth ? "w-full" : 'w-auto'}>
           <SelectValue placeholder={placeholder} />
         </SelectTrigger>
         <SelectContent>
           {options.map(v => (
             <SelectItem key={v.value} value={v.value}>
               {firstCase(v.text)}
             </SelectItem>
           ))}
         </SelectContent>
       </SelectUI>
     )
   }