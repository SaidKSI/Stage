import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getPatient() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/patients", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });

        let list = response.data;
        setPatients(list);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getPatient();
  }, []);

  return (
    <div className="">
      <div>
        <table className="table-auto text-center m-auto border border-sky-500 text-lg">
          <caption>Patients</caption>
          <thead>
            <tr>
              <th className="border border-sky-500 p-5">Index</th>
              <th className="border border-sky-500 p-5">CIN</th>
              <th className="border border-sky-500 p-5">Nom</th>
              <th className="border border-sky-500 p-5">Prenom</th>
              <th className="border border-sky-500 p-5"></th>
            </tr>
          </thead>
          <tbody className="border border-sky-500">
            {patients.map((patient, index) => (
              <tr>
                <td className="border border-sky-500 p-5">{index}</td>
                <td className="border border-sky-500 p-5">{patient.cin}</td>
                <td className="border border-sky-500 p-5">
                  {patient.firstName}
                </td>
                <td className="border border-sky-500 p-5">
                  {patient.lastName}
                </td>

                <td id={patient.id} className="border border-sky-500 p-5">
                  <Link to={"/patients/" + patient.id}>
                    <span className="rounded-sm bg-blue-600 mt-[45vh]">
                      Details
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex mt-[15%] justify-between">
        <Link to={"/patients/addpatients"}>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           
          >
            Add Patients
          </button>
        </Link>
      </div>

      <div>{loading ? <p>Chargement...</p> : ""}</div>
    </div>
  );
}
