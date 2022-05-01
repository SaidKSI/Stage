import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Time from "../components/Time";
import { Navigate } from "react-router-dom";



export default function Visit() {
  const [visits, setVisit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [count, setCount] = useState();
  

  let { id } = useParams();
  useEffect(() => {
    async function getVisits() {
      try {
        
        setLoading(true);
        let response = await axios.get("http://localhost:8000/visits", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token","role"),
          },
        });

        let { rows } = response.data;
        setVisit(rows);
        let { count } = response.data;
        setCount(count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getVisits();
  }, []);
  async function deleteVisitt() {}

  return (
    <div>
      
    <div className="grid grid-rows-5 grid-cols-5 ">
      <div className="col-span-5 row-span-5">
        <div className=" bg-gray-100">
        <div className="font-bold leading-snug text-right px-2 py-2 ">
         <span className="text-blue-800">{count} </span>  Visits 
        </div>
        <div className="px-5 py-5"> 
            <input
            autoComplete="off"
              type="search"
              name="search"
              className="mt-1 block w-40 py-2 px-3 border   border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              placeholder="Search...."
            />
        </div>
          <h1 className="text-xl text-blue-600 py-1 px-5 mb-2">Visits</h1>
              
          <div className="overflow-auto px-32	 rounded-lg shadow hidden md:block">
            <table className=" origin-center	">
              <thead className="bg-gray-50 border-b-2 border-gray-300">
                <tr>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                    Index
                  </th>
                  <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                    Full Name
                  </th>
                  <th className="p-3 min-w-96 text-sm font-semibold tracking-wide text-left">
                    Motif
                  </th>
                  <th className="p-3 min-w-96 text-sm font-semibold tracking-wide text-left">
                    interrogatoire
                  </th>
                  <th className="p-3 min-w-96 text-sm font-semibold tracking-wide text-left">
                    Conclusion
                  </th>
                  <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                    Prix
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {visits
                .filter((visit) => {
                  if (search == "") {
                    return visit
                  } else if (
                    visit.Patient.firstName.toLowerCase().includes(search) || visit.Patient.lastName.toLowerCase().includes(search)
                  ) {
                    return visit
                  }
                })
                .map((visit, index) => ( 
                  <tr >
                    <Link to={"/visits/" + visit.id}>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <a
                          className="font-bold text-blue-500 hover:underline"
                          href=""
                        >
                          {index}
                        </a>
                      </td>
                    </Link>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {`${visit.Patient.firstName} ${visit.Patient.lastName}`}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {visit.motif}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {visit.interrogatoire}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {visit.conclusion}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {visit.prix}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="py-10">
              <Link to={"/visits/addvisit"}>
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Visit
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>{loading ? <p>Chargement...</p> : ""}</div>
      </div>
    </div>
    </div>
  );
}
