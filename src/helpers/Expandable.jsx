'use client'

import { Badge } from '@/components/ui/badge'
import React, { useState }  from 'react'

const Expandable = ({ children, maxChars }) => {
  
  const [expanded, setExpanded] = useState(true)

  if (children.length <= maxChars) return <p>{children}</p>

  let textSpace = expanded ? children.substring(0, maxChars) : children

  return (
    <div className='flex flex-wrap'>
      {
        expanded ? <p>{textSpace}...</p> : <p>{textSpace}</p>
      }
      {/* <p>{textSpace}...</p> */}
      <Badge variant="" className="p-1 text-xs" onClick={ () => setExpanded(!expanded)}>{expanded ? 'Read More' : 'Read Less' }</Badge>
    </div>
  )
}

export default Expandable
