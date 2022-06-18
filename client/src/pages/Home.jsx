import React, { useEffect, useState } from "react";
import CurrentTime from "../components/CurrentTime";
import PatientList from "./PatientList";
import Allrdv from "./Allrdv";
import Visit from "./Visit";
import Paiment from "./Paiment";
import { Link } from "react-router-dom";


export default function Home() {
  const role = localStorage.getItem("role")

  

  return (
    <div className="flex flex-col container mx-auto py-5 ">
      <div className="flex justify-between py-4">
        <div className="px-3 py-2 text-blue-700 flex items-center text-xl  font-bold leading-snug  hover:opacity-75">{localStorage.getItem("userName")}</div>
        <div className="px-3 py-2 text-blue-700 flex items-center text-xl  font-bold leading-snug  hover:opacity-75">{localStorage.getItem("role")}</div>
        <div className="px-3 py-2 text-blue-700 flex items-center text-xl  font-bold leading-snug  hover:opacity-75">
          <CurrentTime></CurrentTime>
        </div>
      </div>
        <div className="">
          <ul className="flex justify-center justify-items-center gap-4 pt-52">
          <li className="">
                    <Link to={"/patients"}>
                      <a
                        className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-blue-500 hover:opacity-75"
                        href=""
                      >
                        Patients
                      </a>
                    </Link>
                  </li>
                  { role !== "Assistance" ?<li className="nav-item">
                    <Link to={"/visits"}>
                      <a
                        className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-blue-500 hover:opacity-75"
                        href="/Visit"


                      >
                        Visites
                      </a>
                    </Link>
                    </li>
                  : null }
                  <li className="nav-item">
                    <Link to={"/rdvs"}>
                      <a
                        className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-blue-500 hover:opacity-75"
                        href=""
                      >
                       RDVs
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/payments"}>
                      <a
                        className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-blue-500 hover:opacity-75"
                        href=""
                      >
                        Paiements
                      </a>
                    </Link>
                  </li>
                   { role === "Admin" ?  <Link to={"/users"}>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xl uppercase font-bold leading-snug text-blue-500 hover:opacity-75"
                      href=""
                    
                    >
                     Users
                    </a>
                  </li></Link>: null }
          </ul>
        </div>
    </div>
  );
}
