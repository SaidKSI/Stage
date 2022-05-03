import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";



export default function PatientDetails() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  



  

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

  



  

 
  



 
  
  
  
  
   

  
  return loading ? (
    <div>loading...</div>
  ) : (
    <div>
      {patient ? (
        <div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Applicant Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Personal details and application.
              </p>
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
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                  
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="py-3">
          <Link to={"/patients/updatepatients/"+ patient.id}>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Modifier
            </button>
          </Link>
        </div>
                  </dd>
                </div>
               
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
