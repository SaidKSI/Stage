import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import Snackbar from "./Notification";

const SnackbarType = {
  success: "success",
  fail: "fail",
};

export default function AddVisit() {
  const [patientId, setPatientId] = useState("");
  const [docteurId, setDocteurId] = useState("");
  const [motif, setMotif] = useState("");
  const [interrogatoire, setinterrogatoire] = useState("");
  const [conclusion, setConclusion] = useState("");
  const [prix, setPrix] = useState("");
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);

  function onInputChange(e) {
    if (e.target.name === "patientId") setPatientId(e.target.value);
    else if (e.target.name === "docteurId") setDocteurId(e.target.value);
    else if (e.target.name === "motif") setMotif(e.target.value);
    else if (e.target.name === "interrogatoire")
      setinterrogatoire(e.target.value);
    else if (e.target.name === "conclusion") setConclusion(e.target.value);
    else if (e.target.name === "prix") setPrix(e.target.value);
  }

  async function onSubmit(e) {
    
    snackbarRef.current.show();
    try {
      e.preventDefault();

      let response = await axios.post(
        "http://localhost:8000/visits/addvisit",
        {
          patientId: patientId,
          userId: docteurId,
          motif: motif,
          interrogatoire: interrogatoire,
          conclusion: conclusion,
          prix: prix,
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
        {" "}
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
          <form action="#" method="POST" className="pb-3">
            <div className="shadow overflow-hidden sm:rounded-md ">
              <div className="flex justify-evenly"><div className="  sm:p-3">
                <label
                  htmlFor="patientId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Patient C.I.N
                </label>
                <input
                  required
                  type="number"
                  id="patientId"
                  value={patientId}
                  onChange={(e) => onInputChange(e)}
                  name="patientId"
                  autoComplete="patienId-name"
                  className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="  sm:p-3">
                <label
                  htmlFor="docteurId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Docteur 
                </label>
                <input
                  required
                  type="number"
                  id="docteurId"
                  value={docteurId}
                  onChange={(e) => onInputChange(e)}
                  name="docteurId"
                  autoComplete="docteurId-name"
                  className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
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
                  required
                  type="text-area"
                  onChange={(e) => onInputChange(e)}
                  id="motif"
                  name="motif"
                  value={motif}
                  className="mt-1 block w-[55%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <br></br>
              <div className=" sm:p-3">
                <label
                  htmlFor="interrogatoire"
                  className="block text-sm font-medium text-gray-700"
                >
                  Interrogatoire
                </label>
                <textarea
                  required
                  type="text"
                  onChange={(e) => onInputChange(e)}
                  id="interrogatoire"
                  value={interrogatoire}
                  name="interrogatoire"
                  className="mt-1 block w-[55%] border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <br></br>
              <div className="sm:p-3">
                <label
                  htmlFor="conclusion"
                  className="block text-sm font-medium text-gray-700"
                >
                  Conclusion
                </label>
                <textarea
                  required
                  type="text"
                  onChange={(e) => onInputChange(e)}
                  id="conclusion"
                  value={conclusion}
                  name="conclusion"
                  className="mt-1 block w-[55%] border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <br></br>
              <div className=" sm:p-3">
                <label
                  htmlFor="prix"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prix
                </label>
                <input
                  required
                  type="number"
                  onChange={(e) => onInputChange(e)}
                  id="prix"
                  name="prix"
                  autoComplete="Prix-name"
                  className="mt-1 block w-[25%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
