import React, { useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";
import Time from "./Time";

export default function MenuNavBar({ fixed }) {
  const visit =useRef()
  const user = useRef()
  
  const role = localStorage.getItem("role")
 

 

  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-wrap py-2">
        <div className="w-full px-4">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-[#6182af] rounded">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">

              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                <Link to={"/"}>
                  <a
                    className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                    href=""
                  >
                    <span className="flex items-center justify-center ">
                      <FontAwesomeIcon
                        icon={faHospital}
                        size="3x"
                        color="#193152"
                      />
                    </span>
                  </a>
                </Link>
                <button
                  className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                ></button>
              </div>
              <div className="font-bold leading-snug text-white ">
                <Time></Time>
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center" +
                  (menuOpen ? " flex" : " hidden")
                }
                id="example-navbar-info"
              >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                  <li className="nav-item">
                    <Link to={"/patients"}>
                      <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        href=""
                      >
                        patients
                      </a>
                    </Link>
                  </li>
                 { role !== "Assistance" ?<><li className="nav-item">
                    <Link to={"/visits"}>
                      <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        href="/Visit"


                      >
                        Visit
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/mypatients"}>
                      <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        href="/mypatients"
                        

                      >
                        My Patients
                      </a>
                    </Link>
                  </li></>: null }
                  <li className="nav-item">
                    <Link to={"/rdvs"}>
                      <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        href=""
                      >
                        RDV
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/payments"}>
                      <a
                        className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                        href=""
                      >
                        paiement
                      </a>
                    </Link>
                  </li>
                   { role === "Admin" ?  <Link to={"/users"}>
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href=""
                    
                    >
                      Users
                    </a>
                  </li></Link>: null }
                  <li className="nav-item">
                    <a
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="#pablo"
                      onClick={() => {
                        localStorage.removeItem("user_token");
                        navigate("/login");
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
