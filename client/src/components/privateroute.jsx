import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Privateroute({children}) {

    let navigate=useNavigate()

    
  return (
    localStorage.getItem("user_token")?
    <>{children}</>
    :
    <Navigate to={"/login"} />
  )
 

}
