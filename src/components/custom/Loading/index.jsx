'use client'

import { CgSpinner } from 'react-icons/cg'
import { PiSpinnerBallFill } from "react-icons/pi";

export const DefaultLoading = () => {
     return <div className='loader'></div>
}

export const LoadingCustom = (className) => {
     return (
          <div>
               <CgSpinner className={`loading-icon ${className.className}`} size={className.size ? className.size : '20px'} />
          </div>
     )
}

export const LoadingV2 = (className) => {
     return (
          <div>
               <PiSpinnerBallFill  className={`loading-icon ${className.className}`} size={className.size ? className.size : '20px'} />
          </div>
     )
}