'use client'

import {
     QueryClient,
     QueryClientProvider,
     HydrationBoundary
} from '@tanstack/react-query'

export default function ReactQueryClientProvider({children}){
     const queryClient = new QueryClient()
     return (
          <QueryClientProvider client={queryClient}>
               {children}
          </QueryClientProvider>
     )
}