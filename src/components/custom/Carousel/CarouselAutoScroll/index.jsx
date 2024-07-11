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
     classNameCarouselContent,
     classNameCards,
     usingCard,
     speed,
     direction,
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
                    AutoScroll({
                         speed: speed || 1,
                         direction: direction || 'forward',
                         stopOnInteraction: false,
                         startDelay: () => ResetIcon
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