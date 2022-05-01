import React, { useEffect,useState } from 'react'

export default function Time() {
    const current = new Date();
    const Time = `${current.getHours()}:${current.getMinutes()}`
    const [time, setTime] = useState()
    useEffect(() => {
      setTime(()=>{
        setTime(Time)
      })
    }, [60000])
    
    return (
      <div>
         <h1 >{Time} </h1>
      </div>
    )
  }