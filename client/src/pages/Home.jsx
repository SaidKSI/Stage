import React, { useEffect, useState } from "react";
import CurrentTime from "../components/CurrentTime";
import PatientList from "./PatientList";
import Allrdv from "./Allrdv";
import Visit from "./Visit";
import Paiment from "./Paiment";
import BarChart from "../components/Graph";

export default function Home() {
  

  

  return (
    <div className="flex flex-col ">
      <div className="flex justify-between py-4">
        <div className="text-blue-800">{localStorage.getItem("userName")}</div>
        <div className="text-blue-800">{localStorage.getItem("role")}</div>
        <div className="Date">
          <CurrentTime></CurrentTime>
        </div>
      </div>
      {/* <BarChart /> */}
      {/* <div className="py-4">
      
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
      </div> */}
    </div>
  );
}
