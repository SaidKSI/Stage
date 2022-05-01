import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ReactNotifications, Store } from 'react-notifications-component'



export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState();

  useEffect(() => {
    async function getPatient() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/patients", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });

        let { rows } = response.data;
        setPatients(rows);
        let { count } = response.data;
        setCount(count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getPatient();
  }, []);

 

  return (
    <div className="">
      <div className=" bg-gray-100">
        <div className="font-bold leading-snug text-right px-2 py-2 ">
         <span className="text-blue-800">{count} </span>  Patients 
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
        <h1 className="text-xl py-2 px-5 text-blue-800 mb-2">Patients</h1>
        <div className="overflow-auto px-60 pb-10 rounded-lg shadow hidden md:block">
          <table className=" origin-center	">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Index
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  C.I.N
                </th>
                <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                  Full Name
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients
                .filter((patient, index) => {
                  if (search == "") {
                    return patient;
                  } else if (
                    patient.firstName.toLowerCase().includes(search) ||
                    patient.lastName.toLowerCase().includes(search)
                  ) {
                    return patient;
                  }
                })
                .map((patient, index) => (
                  <tr>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {index}
                    </td>
                    <Link to={"/patients/" + patient.id}>
                      {" "}
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <a
                          className="font-bold text-blue-500 hover:underline"
                          href=""
                        >
                          {patient.cin}
                        </a>
                      </td>{" "}
                    </Link>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {`${patient.firstName} ${patient.lastName}`}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="py-10">
          <Link to={"/patients/addpatient"}>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Patients
            </button>
          </Link>
        </div>
      </div>

      <div>{loading ? <p>Chargement...</p> : ""}</div>
    </div>
  );
}
