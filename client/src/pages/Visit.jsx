import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function () {
  const [visits, setVisit] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getVisits() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/visit", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });

        let list = response.data;
        setVisit(list);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getVisits();
  }, []);

  return (
    <div className="grid grid-rows-5 grid-cols-5 ">
      <div className="col-span-5 row-span-5">
      <table className="table-auto m-5 ml-[25%] w-[1fr] ">
        <thead>
          <th className="border border-sky-500 p-5">index</th>
          <th className="border border-sky-500 p-5">Motif</th>
          <th className="border border-sky-500 p-5">Patient </th>
          <th className="border border-sky-500 p-5">interrogatoire</th>
          <th className="border border-sky-500 p-5">Conclusion</th>
          <th className="border border-sky-500 p-5">Prix</th>
        </thead>
        <tbody className="border border-sky-500">
          {visits.map((visit, index) => (
            <tr>
              <td className="border border-sky-500 p-5">{index}</td>
              <td className="border border-sky-500 p-5">{visit.motif}</td>
              <td className="border border-sky-500 p-5">{visit.Patient.firstName}</td>
              <td className="border border-sky-500 p-5">
                {visit.interrogatoire}
              </td>
              <td className="border border-sky-500 p-5">{visit.conclusion}</td>
              <td className="border border-sky-500 p-5">{visit.prix}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 py-3 bg-gray-50 text-right mt-[15%] gap-5 sm:px-6 flex justify-start ">
        <Link to={"/visit/addvisit"}>
          <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Visit
          </button>
        </Link>
        <Link to={"/allrdvs"}>
          <button className="inline-flex   justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            All RDVS
          </button>
        </Link>
      </div>
      <div>{loading ? <p>Chargement...</p> : ""}</div>
      </div>
    </div>
  );
}
