import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function RDVlist() {
  const [rdvs, setrdvs] = useState([]);
  const [loading, setLoading] = useState(false);


  let { id } = useParams();


          // get Rdvs of one patients
  async function getRdvs(patientId) {
    try {
      setLoading(true);
      let response = await axios.get(
        "http://localhost:8000/rdvs/" + patientId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );

      let { payload } = response.data;
      setrdvs(payload);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      let pid = parseInt(id);
      getRdvs(pid);
    } catch (err) {
      alert("not found");
    }
  }, []);

  return (
    <div className="flex justify-center">
      <table className="table-auto text-center ">
        <thead>
          <th className="border border-sky-500 p-5">index</th>
          <th className="border border-sky-500 p-5">First Name</th>
          <th className="border border-sky-500 p-5">Last Name</th>
          <th className="border border-sky-500 p-5">date</th>
          <th className="border border-sky-500 p-5">Motif</th>
        </thead>
        <tbody className="border border-sky-500">
          {rdvs.map((patientrdv, index) => (
            <tr>
              <td className="border border-sky-500 p-5">{index}</td>
              <td className="border border-sky-500 p-5">
                {patientrdv.Patient.firstName}
              </td>{" "}
              <td className="border border-sky-500 p-5">
                {patientrdv.Patient.lastName}
              </td>
              <td className="border border-sky-500 p-5">
                {patientrdv.daterdv}
              </td>
              <td className="border border-sky-500 p-5">
                {patientrdv.daterdv}
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
  );
}
