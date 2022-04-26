import axios from "axios";
import React,{ useState } from "react";


export default function AddRDV() {
  const [patientId, setpatientId] = useState("");
  const [motif, setmotif] = useState("");
  const [daterev, setdaterev] = useState("");

  function onInputChange(e) {
    if (e.target.name === "firstName") setpatientId(e.target.value);
    else if (e.target.name === "lastName") setmotif(e.target.value);
    else if (e.target.name === "cin") setdaterev(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();

    let response = await axios.post(
      "http://localhost:8000/rdv",
      {
        patientId: patientId,
        motif: motif,
        daterev: daterev
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        }
      }
    ); //console.log(response)
  }

  return (
    <div>
        <div>
      <div>
        <div className="mt-10 sm:mt-0">
          <form action="#" method="POST">
            <div className="shadow overflow-hidden sm:rounded-md ">
              <div className=" bg-white sm:p-3">
                <label
                  htmlFor="patientId"
                  className="block text-sm font-medium text-gray-700"
                >
                  PatientID
                </label>
                <input
                  type="text"
                  id="patientId"
                  onChange={(e) => onInputChange(e)}
                  name="patientId"
                  autoComplete="patientId-name"
                  className="mt-1 block w-[25%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <br></br>
              <div className="bg-white sm:p-3">
                <label
                  htmlFor="motif"
                  className="block text-sm font-medium text-gray-700"
                >
                  Motif
                </label>
                <textarea
                  type="text-area"
                  onChange={(e) => onInputChange(e)}
                  id="motif"
                  name="motif"
                  autoComplete="motif-name"
                  className="mt-1 block w-[50%] py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <br></br>
              <div className="bg-white sm:p-3">
                <label
                  htmlFor="daterdv"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date de RDV
                </label>
                <textarea
                  type="date"
                  onChange={(e) => onInputChange(e)}
                  id="daterdv"
                  name="daterdv"
                  className="mt-1 block w-[50%] border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div> 
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e) => onSubmit(e)}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    </div>
  )
}
