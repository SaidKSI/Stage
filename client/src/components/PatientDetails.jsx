import axios from "axios";
import dateFormat from "dateformat";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

export default function PatientDetails() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  let firstNameref = useRef();
  let lastNameref = useRef();
  let cinref = useRef();
  let savebutton = useRef();
  let updatebutton = useRef();

  let { id } = useParams();

  // get one Patient
  async function getPatient(patientId) {
    try {
      setLoading(true);
      let response = await axios.get(
        "http://localhost:8000/patients/" + patientId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );

      let { payload } = response.data;
      setPatient(payload);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      let pid = parseInt(id);
      getPatient(pid);
    } catch (err) {
      alert("not found");
    }
  }, []);
  // update
  //  function update()
  // {

  //   firstNameref.disabled = false
  //   lastNameref.disabled = false
  //   cinref.disabled = false
  //   updatebutton.disabled = true
  //   savebutton.hidden = false

  // }

  // async function saveupdate(patientId) {}
  // delet
  async function delet(patientId) {
    try {
      let response = await axios.get(
        "http://localhost:8000/patient/" + patientId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );
      alert("patient has been deleted");

      <Navigate to={"/patients"} />;
    } catch (err) {
      alert("error");
    }
  }
  return loading ? (
    <div>loading...</div>
  ) : (
    <div>
      {patient ? (
        <div>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Patient Informations
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Add your new patient to the database
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name
                          </label>
                          <input
                            ref={firstNameref}
                            type="text"
                            id="firstName"
                            disabled="true"
                            name="firstName"
                            value={patient.firstName}
                            autoComplete="country-name"
                            className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last name
                          </label>
                          <input
                            ref={lastNameref}
                            type="text"
                            disabled="true"
                            value={patient.lastName}
                            id="lastName"
                            name="lastName"
                            autoComplete="lastName-name"
                            className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="cin"
                            className="block text-sm font-medium text-gray-700"
                          >
                            CIN
                          </label>
                          <input
                            type="text"
                            ref={cinref}
                            disabled="true"
                            value={patient.cin}
                            id="cin"
                            name="cin"
                            autoComplete="cin-name"
                            className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
                      <button
                        ref={updatebutton}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // onClick={update()}
                      >
                        Modifier
                      </button>
                      <button
                        ref={savebutton}
                        hidden="true"
                        type="submit"
                        className="inline-flex justify-center py-2 px-4  border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        // onClick={(e) => saveupdate(patient.id)}
                      >
                        Save
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4  border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => delet(patient.id)}
                      >
                        Supp
                      </button>
                      {/* <Link to={"/rdvs/" + patient.id}>
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4  border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View RDVs
                        </button>
                      </Link> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            <div></div>
          </div>
          <div className="flex justify-center">
      <table className="table-auto text-center ">
        <thead>
          <th className="border border-sky-500 p-5">index</th>
          <th className="border border-sky-500 p-5">Motif</th>
          <th className="border border-sky-500 p-5">date</th>
         
        </thead>
        <tbody className="border border-sky-500">
          {patient.Rdvs.map((patientrdv, index) => (
            <tr>
              <td className="border border-sky-500 p-5">{index}</td>
              <td className="border border-sky-500 p-5">
                {patientrdv.motif}
              </td>
              <td className="border border-sky-500 p-5">
                {new Date(patientrdv.daterdv).toDateString( )}
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
      ) : (
        ""
      )}
    </div>
  );
}

// new Intl.DateTimeFormat("en-US", {
//   year: "numeric",
//   month: "2-digit",
//   day: "2-digit",
//   hour: "2-digit",
//   minute: "2-digit",
//   second: "2-digit",
// }).format(daterdv)
