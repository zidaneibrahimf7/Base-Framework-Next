'use client'

import React from "react";
import {
  Carousel as CarouselUI,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card";

export default function Carousel({
     view,
     content,
     usingCard,
     className,
     classNameContent,
     classNameCarouselContent,
     classNameCards,
     delay,
     scrollMode,
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
               {...props}
               >
               <CarouselContent className={classNameContent}>
                    {isObject
                         ? Object.keys(content).map((key) => (
                              <CarouselItem key={key} className={classNameCarouselContent}>
                                   {usingCard ? (
                                        <div className="p-1" key={key}>
                                             <Card>
                                                  <CardContent className={classNameCards ? classNameCards : "flex aspect-square items-center justify-center p-1"}>
                                                       {content[key]}
                                                  </CardContent>
                                             </Card>
                                        </div>
                                   ) : (
                                        <div className="p-1" key={key}>
                                             {content[key]}
                                        </div>
                                   )}
                              </CarouselItem>
                         ))
                         : content?.map((item, index) => (
                              <CarouselItem key={index} className={classNameCarouselContent}>
                                   {usingCard ? (
                                        <div className="p-1" key={index}>
                                             <Card>
                                                  <CardContent className={classNameCards ? classNameCards : "flex aspect-square items-center justify-center p-1"}>
                                                       {/* Buat elemen berdasarkan nilai item */}
                                                       {item}
                                                  </CardContent>
                                             </Card>
                                        </div>
                                   ) : (
                                        <div className="p-1" key={index}>
                                             {/* Buat elemen berdasarkan nilai item */}
                                             {item}
                                        </div>
                                   )}
                              </CarouselItem>
                         ))}
               </CarouselContent>
               {scrollMode ? (
                    <>
                         <CarouselPrevious />
                         <CarouselNext />
                    </>
               ) : null}
          </CarouselUI>
     )
}
