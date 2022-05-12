import axios from "axios";
import dateFormat from "dateformat";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";


export default function VisitDetails() {
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(false);
 
  let { id } = useParams();
  
  // get one Visit
  async function getVisit(visitId) {
    try {
      setLoading(true);
      let response = await axios.get(
        "/visits/" + visitId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );

      let { payload } = response.data;
      setVisit(payload);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  useEffect(() => {
    try {
      let vid = parseInt(id);
      getVisit(vid);
    } catch (err) {
      alert("not found");
    }
  }, []);
  
  return loading ? (
    <div>loading...</div>
  ) : (
    <div>
      {visit ? (
        <div>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Applicant Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Visit details .
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {visit.id}
                  </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{`${visit.Patient.firstName} ${visit.Patient.lastName}`}</dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Motif</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {visit.motif}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                  Interrogatoire
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {visit.interrogatoire}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                  Conclusion
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {visit.conclusion}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                  Prix
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {visit.prix}
                  </dd>
                  
                </div>
                
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">

                  <div className="px-4 py-3  text-right sm:px-6">
                  <Link to={"/payments/addpayment/"+visit.Patient.id}>
                  
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                   
                  >
                    Add Payment
                    
                  </button>
                  </Link>
                  </div>
                 
                  
                </div>
                {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
                                {" "}
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
                </div> */}
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

