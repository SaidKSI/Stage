import React, { useEffect, useState } from "react";
import CurrentTime from "../components/CurrentTime";
import PatientList from "./PatientList";
import Allrdv from "./Allrdv";
import Visit from "./Visit";
import Paiment from "./Paiment";


export default function Home() {
  

  

  return (
    <div className="flex flex-col container mx-auto py-5 ">
      <div className="flex justify-between py-4">
        <div className="px-3 py-2 text-blue-700 flex items-center text-xl  font-bold leading-snug  hover:opacity-75">{localStorage.getItem("userName")}</div>
        <div className="px-3 py-2 text-blue-700 flex items-center text-xl  font-bold leading-snug  hover:opacity-75">{localStorage.getItem("role")}</div>
        <div className="px-3 py-2 text-blue-700 flex items-center text-xl  font-bold leading-snug  hover:opacity-75">
          <CurrentTime></CurrentTime>
        </div>
      </div>
      
      <div className="py-4">
      
        <PatientList></PatientList>
      </div>
      <div className="py-4">
    
        <Allrdv></Allrdv>
      </div>
      <div className="py-4">
    
        <Visit></Visit>
      </div>
      <div className="py-4">
        
        <Paiment></Paiment>
      </div>
    </div>
  );
}
