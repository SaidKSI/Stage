import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Allrdv() {
  const [rdvs, setrdvs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getAllRdv() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/allrdvs", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });

        let list = response.data;
        setrdvs(list);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getAllRdv();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <table className="table-auto text-center ">
          <thead>
            <th className="border border-sky-500 p-5">index</th>
            <th className="border border-sky-500 p-5">Patiend ID</th>
            <th className="border border-sky-500 p-5">Motif</th>

            <th className="border border-sky-500 p-5">date</th>
          </thead>
          <tbody className="border border-sky-500">
            {rdvs.map((rdv, index) => (
              <tr>
                <td className="border border-sky-500 p-5">{index}</td>
                <td className="border border-sky-500 p-5">
                  {rdv.patientId}
                </td>{" "}
                <td className="border border-sky-500 p-5">{rdv.motif}</td>
                <td className="border border-sky-500 p-5">
                  {new Date(rdv.daterdv).toDateString()}
                </td>
                {/* <td id={patient.id} className="border border-sky-500 p-5">
                  <Link to={"/visit/" + patient.id}>
                    <span className="rounded-sm bg-blue-600 mt-[45vh]">
                      Details
                    </span>
                  </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
