import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Adminroute({children}) {

    let navigate=useNavigate()

    
  return (
    localStorage.getItem("role") === "Admin" ?
    <>{children}</>
    : 
    <Navigate to={"/"} />
  )
 

}
