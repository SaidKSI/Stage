import axios from "axios";
import React, { useEffect, useState , useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loader from "./Loading";
import Snackbar from "../components/Notification";




const SnackbarType = {
  success: "success",
  fail: "fail",
};
export default function PatientDetails() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);

  let { id } = useParams();
  useEffect(() => {
    try {
      let pid = parseInt(id);
      getPatient(pid);
    } catch (err) {
      alert("not found");
    }
  }, []);
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
  async function handleDeleteClick(patientId) {
    window.location.reload();
    try {
      let response = await axios.delete(
        "http://localhost:8000/patients/" + patientId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );
      setResult(SnackbarType.success);
      setMsg("patient added");
      return result, msg;
    } catch (err) {
      setResult(SnackbarType.fail);
      setMsg("something went wrong");
      return result, msg;
    }
  }

  return loading ? (
    <div>
      {" "}
      <Loader />{" "}
    </div>
  ) : (
    <div>
      {patient ? (
        <div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="flex justify-between items-center">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Applicant Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Personal details and application.
                </p>
              </div>
              <div className="flex justify-center justify-items-center gap-2">
                <div className="">
                  <Link
                    to={"/visits/addvisit/" + patient.id}
                    className="inline-flex justify-center py-2 px-5  border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Add Visit
                  </Link>
                </div>
                <div>
                  <Link
                    to={"/rdvs/addrdv/" + patient.id}
                    className="inline-flex justify-center py-2 px-5  border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Add RDV
                  </Link>
                </div>{" "}
                <div>
                <Link to={"/patients/patientcontact/" + patient.id}
              className="inline-flex justify-center py-2 px-5  border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                    Contact Patient
                  </Link>
                </div>
                <div>
                <button
                              onClick={() => handleDeleteClick(patient.id)}
                              type="submit"
                              className="inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Delete
                            </button>
                            <Snackbar
                          ref={snackbarRef}
                          message={msg}
                          type={result}
                        />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">C.I.N</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {patient.cin}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`${patient.firstName} ${patient.lastName}`}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {patient.gender}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date de Naissance
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(patient.dateN).toDateString()}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {patient.email}
                  </dd>
                </div>
               
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className=" ">
                    <h3>Visits</h3>
                    <div className="flex-col space-y-3">
                      {patient.Visits.map((visit, index) => (
                        <Link to={"/visits/" + visit.id}>
                          <div className="text-blue-600">{visit.motif}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                
                  </dt>
                  
                </div>
                  <dt className="text-sm font-medium text-gray-500">RDV</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className=" bg-gray-100">
                      <div className="overflow-auto  px-20 rounded-lg shadow hidden md:block ">
                        <table className=" table-auto   	">
                          <thead className="bg-gray-50 border-b-2 border-gray-200">
                            <tr>
                              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                                Index
                              </th>

                              <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                                Full Name
                              </th>
                              <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                                Date
                              </th>
                              <th className="p-3 w-9/12 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                                Motif
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {patient.Rdvs.map((patientrdv, index) => (
                              <tr>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                  {index}
                                </td>

                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                  {new Date(patientrdv.daterdv).toDateString()}
                                </td>
                                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                  {patientrdv.motif}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
