import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import Snackbar from "./Notification";
import { Times } from "./utils/Times";

const SnackbarType = {
  success: "success",
  fail: "fail",
};
export default function AddRDV() {
  const [patientId, setpatientId] = useState("");
  const [motif, setmotif] = useState("");
  const [daterdv, setdaterdv] = useState("");
  const [specialization, setSpecialization] = useState();

  const [timerdv, setRdvTime] = useState();

  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);

  function onInputChange(e) {
    if (e.target.name === "patientId") setpatientId(e.target.value);
    else if (e.target.name === "motif") setmotif(e.target.value);
    else if (e.target.name === "daterdv") setdaterdv(e.target.value);
    else if (e.target.name === "specialization")
      setSpecialization(e.target.value);
    else if (e.target.name === "name") setRdvTime(e.target.value);
  }
  async function onSubmit(e) {
    window.location.reload();
    try {
      e.preventDefault();

      let response = await axios.post(
        "http://localhost:8000/rdvs/addrdv",
        {
          patientId: patientId,
          motif: motif,
          daterdv: daterdv,
          specialization: specialization,
          timerdv: timerdv,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );
      setResult(SnackbarType.success);
      setMsg("patient added");
      return result, msg;
    } catch {
      setResult(SnackbarType.fail);
      setMsg("something went wrong");
      return result, msg;
    }
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className="grid grid-cols-4 gap-6">
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
        <div className="mt-5  col-span-3">
          <form action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md ">
              <div className="  sm:p-3">
                <label
                  htmlFor="patientId"
                  className="block text-sm font-medium text-gray-700"
                >
                  PatientID
                </label>
                <input
                  type="text"
                  id="patientId"
                  value={patientId}
                  onChange={(e) => onInputChange(e)}
                  name="patientId"
                  autoComplete="patientId-name"
                  className="mt-1 block w-[25%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <br></br>
              <div className=" sm:p-3">
                <label
                  htmlFor="motif"
                  className="block text-sm font-medium text-gray-700"
                >
                  Motif
                </label>
                <textarea
                  type="text-area"
                  value={motif}
                  onChange={(e) => onInputChange(e)}
                  id="motif"
                  name="motif"
                  autoComplete="motif-name"
                  className="mt-1 block w-[50%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <br></br>
              <div className="p-3">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Specialization
                </label>
                <select
                  className="form-select appearance-none
                        block
                        
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="Default select example "
                  name="specialization"
                  value={specialization}
                  onChange={(e) => onInputChange(e)}
                >
                  <option value="Allergy and immunology" className="">
                    Allergy and immunology
                  </option>
                  <option value="Dermatology" className="">
                    Dermatology
                  </option>
                  <option value="Family medicine" className=" ">
                    Family medicine
                  </option>
                  <option value="Medical genetics" className=" ">
                    Medical genetics
                  </option>
                  <option value="Neurology" className=" ">
                    Neurology
                  </option>
                  <option value="Ophthalmology" className=" ">
                    Ophthalmology
                  </option>
                  <option value="Pediatrics" className=" ">
                    Pediatrics
                  </option>
                  <option
                    value="Physical medicine and rehabilitation"
                    className=" "
                  >
                    Physical medicine and rehabilitation
                  </option>
                  <option value="Psychiatry" className=" ">
                    Psychiatry
                  </option>
                  <option value="Surgery" className=" ">
                    Surgery
                  </option>
                </select>
              </div>
              <br></br>
              <div className=" sm:p-3 flex justify-evenly">
                <div>
                  <label
                    htmlFor="daterdv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date de RDV
                  </label>
                  <input
                    type="date"
                    onChange={(e) => onInputChange(e)}
                    id="daterdv"
                    name="daterdv"
                    value={daterdv}
                    className="mt-1 block py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></input>
                </div>
                <div>
                  <h3 className="block text-sm font-medium text-gray-700">
                    Date RDV
                  </h3>
                  <ul className="flex flex-rows">
                    {Times.map(({ id, time }, index) => {
                      return (
                        <li key={index}>
                          <div className="w-1/3 bg-white rounded-lg">
                            <div className="divide-y-2  divide-gray-100">
                              <li className="px-1">
                                <label
                                  className="block text-sm font-medium text-gray-700"
                                  htmlFor={time}
                                >
                                  {time}
                                </label>
                                <input
                                  type="radio"
                                  id={id}
                                  name="name"
                                  onChange={(e) => onInputChange(e)}
                                  value={time}
                                />
                              </li>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="px-4 py-[0.100vh] border-none text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e) => onSubmit(e)}
                >
                  Save
                </button>
                <Snackbar ref={snackbarRef} message={msg} type={result} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
