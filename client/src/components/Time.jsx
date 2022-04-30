import React, { useEffect } from 'react'

export default function Time() {
    const current = new Date();
    const Time = `${current.getHours()}:${current.getMinutes()}`
    
    useEffect(() => {
      
    }, [60000])
    
    return (
      <div>
         <h1 className="text-blue-800">{Time} </h1>
      </div>
    )
  }