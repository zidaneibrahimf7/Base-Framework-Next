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
     usingCard,
     className,
     classNameContent,
     classNameCarouselContent,
     classNameCards,
     delay,
     ...props
}){
     const isObject = typeof content === 'object' && !Array.isArray(content);

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
               {isObject
                         ? Object.keys(content).map((key) => (
                              <CarouselItem key={key} className={classNameCarouselContent}>
                                   {
                                        usingCard ?
                                        <div className="p-1" key={key}>
                                             <Card>
                                                       <CardContent className={ classNameCards ? classNameCards : "flex aspect-square items-center justify-center p-1"}>
                                                            {content[key]}
                                                       </CardContent>
                                             </Card>
                                        </div>
                                        :
                                        <div className="p-1" key={key}>
                                             {content[key]}
                                        </div>
                                   }
                              </CarouselItem>
                         ))
                         : content.map((item, index) => (
                              <CarouselItem key={index} className={classNameCarouselContent}>

                                   {item}
                              </CarouselItem>
               ))}
               </CarouselContent>
               {/* <CarouselPrevious />
               <CarouselNext /> */}
          </CarouselUI>
     )
}