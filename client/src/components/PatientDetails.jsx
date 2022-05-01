import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Dialog from "./Msg";


export default function PatientDetails() {
  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);

  let firstNameref = useRef();
  let lastNameref = useRef();
  let cinref = useRef();
  let savebutton = useRef();
  let updatebutton = useRef();

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
  // async function deletePatient(patientId) {
  //   try {
  //     setLoading(true);
  //     let response = await axios.delete(
  //       "http://localhost:8000/patients/" + patientId,
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("user_token"),
  //         },
  //       }
  //     );
  //     setLoading(false);
  //   } catch (err) {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   try {
  //     let pid = parseInt(id);
  //     deletePatient(pid);
  //   } catch (err) {
  //     alert("not found");
  //   }
  // }, []);

  const handleSubmit = async (patientId) => {
    try {
      setLoading(true);
      let response = await axios.delete(
        "http://localhost:8000/patients/" + patientId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }

    
  };
useEffect(() => {
      try {
        let pid = parseInt(id);
        handleSubmit(pid);
      } catch (err) {
        alert("not found");
      }
    }, []);
  const handleCloseDialog = () => {
    setIsShowDialog(!isShowDialog);
  };

  const DialogActions = (btnColor) => {
    return (
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className={`w-full inline-flex justify-center rounded-md border 
          border-transparent shadow-sm px-4 py-2 ${btnColor}-600 text-base
          font-medium text-white hover:${btnColor}-700 focus:outline-none
          focus:ring-2 focus:ring-offset-2 
          focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md
          border border-gray-300 shadow-sm px-4 py-2 bg-white text-base 
          font-medium text-gray-700 hover:bg-gray-50 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleCloseDialog}
        >
          Cancel
        </button>
      </div>
    );
  };

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
                  <dt className="text-sm font-medium text-gray-500">Age</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    ....
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address / Phone Number
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    margotfoster@example.com
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Total debt
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    $120,000
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <div className="">
                    <button
                      ref={updatebutton}
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 w-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      // onClick={update()}
                    >
                      Modifier
                    </button>
                  </div>
                  <div>
                    <button
                      ref={updatebutton}
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 w-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={handleCloseDialog}
                    >
                      Supp
                    </button>
                  </div>
                  {isShowDialog && (
                    <Dialog
                      title={"Dialog Title"}
                      handleCloseDialog={handleCloseDialog}
                      actionsPannel={DialogActions("bg-blue")}
                      size={"w-2/7"}
                      color={"bg-green"}
                    >
                     Deleting Patients{`${patient.firstName} ${patient.lastName}`}?!
                    </Dialog>
                  )}
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
