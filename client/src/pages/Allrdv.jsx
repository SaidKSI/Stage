import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Time from "../components/Time"
export default function Allrdv() {
  const [rdvs, setrdvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [count, setCount] = useState();

  useEffect(() => {
    async function getAllRdv() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/rdvs", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });
          
        let { rows } = response.data;
        setrdvs(rows);
        let { count } = response.data;
        setCount(count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getAllRdv();
  }, []);

  return (
      <div>
     
      <div className="grid grid-rows-5 grid-cols-5 ">
      <div className="col-span-5 row-span-5">
        <div className=" bg-gray-100">
        <div className="font-bold leading-snug text-right px-2 py-2 ">
         <span className="text-blue-800">{count} </span>  Rdvs 
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
          <h1 className="text-xl py-1 px-5 text-blue-800 mb-2">RDVs</h1>

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
                  <th className="p-3 w-9/12 text-sm font-semibold tracking-wide text-left">
                    Motif
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {rdvs
                .filter((rdv, index) => {
                  if (search == "") {
                    return rdv
                  } else if (
                    rdv.Patient.firstName.toLowerCase().includes(search) || rdv.Patient.lastName.toLowerCase().includes(search)
                  ) {
                    return rdv
                  }
                })
                .map((rdv, index) => ( 
                  <tr >
                    <Link to={"/rdv/" + rdv.id}>
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
                      {`${rdv.Patient.firstName} ${rdv.Patient.lastName}`}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {rdv.motif}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="py-10">
              <Link to={"/rdvs/addrdv"}>
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add RDV
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
