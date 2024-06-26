'use client'

import {
  Carousel as CarouselUI,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



export default function Carousel({
     view,
     content,
     className,
     classNameContent,
     delay,
     ...props
}){
     return (
          <CarouselUI 
               orientation={view === 'vertical' ? 'vertical' : 'horizontal'}
               className={className}
               opts={{
                    align: "start",
               }}
               {...props}
               >
               <CarouselContent className={classNameContent}>
                    {content}
               </CarouselContent>
               <CarouselPrevious />
               <CarouselNext />
          </CarouselUI>
     )
}