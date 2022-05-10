import axios from "axios";
import dateFormat from "dateformat";
import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Snackbar from "./Notification";

const SnackbarType = {
  success: "success",
  fail: "fail",
};
export default function PatientDetails() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [cin, setcin] = useState("");
  const [gender, setGender] = useState("");
  const [dateN, setDateN] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
 

  let { id } = useParams();
  function onInputChange(e) {
    if (e.target.name === "firstName") setfirstName(e.target.value);
    else if (e.target.name === "lastName") setlastName(e.target.value);
    else if (e.target.name === "cin") setcin(e.target.value);
    else if (e.target.name === "gender") setGender(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "dateN") setDateN(e.target.value);
  }
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

  async function onSubmit(patientId) {
    window.location.reload();
    try {
      snackbarRef.current.show();
      patientId.preventDefault();

      let response = await axios.put(
        "http://localhost:8000/patients/" + patientId,
        {
          firstName: firstName,
          lastName: lastName,
          cin: cin,
          gender: gender,
          email: email,
          dateN: dateN,
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
                    Edit your new patient to the database
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5  sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            onChange={(e) => onInputChange(e)}
                            name="firstName"
                            value={patient.firstName}
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
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={patient.lastName}
                            id="lastName"
                            name="lastName"
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
                            onChange={(e) => onInputChange(e)}
                            value={patient.cin}
                            id="cin"
                            name="cin"
                            autoComplete="cin-name"
                            className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <br />
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="dateN"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Date De Naissance
                          </label>
                          <input
                            type="date"
                            onChange={(e) => onInputChange(e)}
                            value={patient.dateN}
                            id="dateN"
                            name="dateN"
                            autoComplete="cin-name"
                            className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                        <br />
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <input
                            type="text"
                            onChange={(e) => onInputChange(e)}
                            value={patient.email}
                            id="email"
                            name="email"
                            className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>

                        <br />
                        <div className="flex justify-evenly  col-span-6 sm:col-span-3">
                          <div>
                            <label
                              htmlFor="Homme"
                              className="block text-sm font-medium text-gray-700"
                              for="Homme"
                            >
                              Homme
                            </label>
                            <input
                              type="radio"
                              id="Homme"
                              value={"Homme"}
                              name="Homme"
                              onClick={() => setGender("Male")}
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="Femme"
                              className="block text-sm font-medium text-gray-700"
                              for="Femme"
                            >
                              Femme
                            </label>
                            <input
                              type="radio"
                              value={"Femme"}
                              id="Femme"
                              name="Femme"
                              onClick={() => setGender("Femme")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div className="px-4 py-3  text-right sm:px-6">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={(e) => onSubmit(patient.id)}
                        >
                          Save
                        </button>
                        <Snackbar
                          ref={snackbarRef}
                          message={msg}
                          type={result}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
