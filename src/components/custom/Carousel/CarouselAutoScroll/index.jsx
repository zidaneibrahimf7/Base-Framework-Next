'use client'

import {
  Carousel as CarouselUI,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import AutoScroll from "embla-carousel-auto-scroll"



export default function CarouselAutoScroll({
     view,
     content,
     className,
     classNameContent,
     speed,
     direction,
     ...props
}){
     return (
          <CarouselUI 
               orientation={view === 'vertical' ? 'vertical' : 'horizontal'}
               className={className}
               opts={{
                    align: "start",
               }}
               plugins={[
                    AutoScroll({
                         speed: speed || 1,
                         direction: direction || 'forward',
                         stopOnInteraction: false,
                         // playOnInit: true,
                         // stopOnFocusIn: true
                    })
                    // Autoplay({
                    //      delay: delay || 2000,
                    //      stopOnFocusIn: false,
                    //      stopOnInteraction: false
                    // }),
               ]}
               {...props}
               >
               <CarouselContent className={classNameContent}>
                    {content}
               </CarouselContent>
               {/* <CarouselPrevious />
               <CarouselNext /> */}
          </CarouselUI>
     )
}