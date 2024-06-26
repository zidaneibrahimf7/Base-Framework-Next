'use client'

import {
  Carousel as CarouselUI,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from 'embla-carousel-autoplay'


export default function CarouselAutoPlay({
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
               plugins={[
                    Autoplay({
                         delay: delay || 2000,
                         stopOnFocusIn: false,
                         stopOnInteraction: false
                    }),
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