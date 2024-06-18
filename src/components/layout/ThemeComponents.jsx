'use client'

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ThemeComponents({themeName}){
     const { setTheme } = useTheme()
     const [themes, setThemes] = useState(setTheme)

     useEffect(() => {
          if(themes){
               themeName(themes)
          }
     }, [themes])
     return (
          <>
           <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                         <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                         <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                         <span className="sr-only">Toggle theme</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                         <DropdownMenuItem onClick={() => {
                              setTheme("light")
                              setThemes('light')
                              }}>
                         Light
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() => {
                              setTheme("dark")
                              setThemes('dark')
                         }}>
                         Dark
                         </DropdownMenuItem>
                         <DropdownMenuItem onClick={() =>{
                              setTheme("system")
                              setThemes('system')
                         }}>
                         System
                         </DropdownMenuItem>
               </DropdownMenuContent>
          </DropdownMenu>
          </>
     )
}