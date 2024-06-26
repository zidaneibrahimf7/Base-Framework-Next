'use client'

import React, { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import Carousel from '@/components/custom/Carousel'
import { Card, CardContent } from '@/components/ui/card'
import { CarouselItem } from '@/components/ui/carousel'



export default function ProductsCarousel(){
     return (
          <div className=''>
               <Carousel
                    view={'horizontal'}
                    // classNameContent={''}
                    content={
                       Array.from({ length: 5 }).map((_, index) => (
                              <CarouselItem key={index} className="basis-1/3">
                              <div className="p-1">
                              <Card>
                                   <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                   </CardContent>
                              </Card>
                              </div>
                              </CarouselItem>
                         ))
                    }
               />
          </div>
     )
}