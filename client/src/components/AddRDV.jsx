import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import Snackbar from "./Notification";

const SnackbarType = {
  success: "success",
  fail: "fail",
};
export default function AddRDV() {
  const [patientId, setpatientId] = useState("");
  const [motif, setmotif] = useState("");
  const [daterdv, setdaterdv] = useState("");
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);

  function onInputChange(e) {
    if (e.target.name === "patientId") setpatientId(e.target.value);
    else if (e.target.name === "motif") setmotif(e.target.value);
    else if (e.target.name === "daterdv") setdaterdv(e.target.value);
  }
  async function onSubmit(e) {
    window.location.reload();
    try {
      e.preventDefault();

      let response = await axios.post(
        "/api/rdvs/addrdv",
        {
          patientId: patientId,
          motif: motif,
          daterdv: daterdv,
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
    <div>
      <div>
        <div>
          <div className="mt-10 sm:mt-0">
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
                <div className=" sm:p-3">
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

                    className="mt-1 block w-[15%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></input>
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
    </div>
  );
}
