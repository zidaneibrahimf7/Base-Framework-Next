'use client'

import React from 'react'
import { Skeleton } from '../ui/skeleton'


export const SkeletonText = () => {
     return (
          <Skeleton className={`h-4 w-[250px]`} />
     )
}

export const SkeletonAvatar = (ratio) => {
     return (
          <Skeleton className={`h-12 w-12 rounded-full`} />
     )
}

export const SkeletonBadge = () => {
     return (
          <div className="flex items-center space-x-4">
               <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                         <Skeleton className={`h-4  w-[250px]`} />
                         <Skeleton className={`h-4  w-[200px]`} />
                    </div>
          </div>
     )
}

export const SkeletonBadgeWithBorder = () => {
     return (
          <div className="flex items-center space-x-4 border border-2 p-3 rounded-xl border-secondary">
               <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                         <Skeleton className={`h-4  w-[250px]`} />
                         <Skeleton className={`h-4  w-[200px]`} />
                    </div>
          </div>
     )
}