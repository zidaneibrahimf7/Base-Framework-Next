'use client'

import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Tooltip({
     trigger,
     content
}){
     return (
          <TooltipProvider>
               <TooltipUI>
               <TooltipTrigger>{trigger}</TooltipTrigger>
               <TooltipContent>
                    <p>{content}</p>
               </TooltipContent>
               </TooltipUI>
          </TooltipProvider>
     )
}