'use client'

import { useState } from "react"
import { Label } from "@/components/custom/Form"
import ThemeComponents from "@/components/layout/ThemeComponents"
import { firstCase } from "@/helpers/Helpers"
import MapBoxComponents from "@/components/pages/Playground/Mapbox/MapBoxComponents"
import { COORDINATES } from "@/helpers/constants"
import TryHitApi from "@/components/pages/Playground/_components/tryHitApi"
import HitApiSelf from "@/components/pages/Playground/_components/hitAPISelf"

export default function Playground(){
     const [themeName, setThemeName] = useState('System')
     const handleThemes = (e) => setThemeName(firstCase(e))

     return (
          <main className="m-3 p-3">
               <header className="flex justify-between">
                    <h1 className="text-3xl">Playground Page</h1>
                    <div className="flex gap-2">
                         <Label className="mt-3 pr-3" value={`Theme: ${themeName}`} isRequired={false} />
                         <ThemeComponents themeName={handleThemes} />      
                    </div>
               </header>
               <fieldset className='border rounded-lg flex gap-2 mt-3 py-5 p-4'>
                     <legend>Map Container</legend>
                     <MapBoxComponents coordinates={COORDINATES} />
               </fieldset>
               <fieldset className='border rounded-lg mt-3 py-5 p-4'>
                  <TryHitApi />
               </fieldset>
               <fieldset className='border rounded-lg mt-3 py-5 p-4'>
                  <HitApiSelf />
               </fieldset>
          </main>
     )
}