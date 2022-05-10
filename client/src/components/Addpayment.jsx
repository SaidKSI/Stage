import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import Snackbar from "./Notification";

const SnackbarType = {
  success: "success",
  fail: "fail",
};
export default function Addpayment() {
  const [patientId, setpatientId] = useState("");
  const [visitId, setvisitId] = useState("");
  const [montant, setmontant] = useState("");
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);

  function onInputChange(e) {
    if (e.target.name === "patientId") setpatientId(e.target.value);
    else if (e.target.name === "visitId") setvisitId(e.target.value);
    else if (e.target.name === "montant") setmontant(e.target.value);
  }

  async function onSubmit(e) {
    window.location.reload();
    try {
      e.preventDefault();

      let response = await axios.post(
        "http://localhost:8000/payment",
        {
          patientId: patientId,
          visitId: visitId,
          montant: montant,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );
      setResult(SnackbarType.success);
      setMsg("Payment added");
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
                  type="number"
                  id="patientId"
                  onChange={(e) => onInputChange(e)}
                  name="patientId"
                  autoComplete="patientId-name"
                  className="mt-1 block w-[25%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <br></br>
              <div className=" sm:p-3">
                <label
                  htmlFor="visitId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Visit ID
                </label>
                <input
                  type="number"
                  onChange={(e) => onInputChange(e)}
                  id="visitId"
                  required
                  name="visitId"
                  autoComplete="visitId-name"
                  className="mt-1 block w-[25%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></input>
              </div>
              <br></br>
              <div className=" sm:p-3">
                <label
                  htmlFor="montant"
                  className="block text-sm font-medium text-gray-700"
                >
                  Montant
                </label>
                <input
                  type="number"
                  onChange={(e) => onInputChange(e)}
                  id="montant"
                  name="montant"
                  required
                  autoComplete="montant-name"
                  className="mt-1 block w-[25%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></input>
              </div>
              <div className="px-4 py-3  text-right sm:px-6">
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
