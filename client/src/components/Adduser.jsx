import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import Snackbar from "./Notification";

const SnackbarType = {
  success: "success",
  fail: "fail",
};

export default function Adduser() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [role, setRole] = useState("Docteur");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [specialization, setSpecialization] = useState();


  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);

  function onInputChange(e) {
    if (e.target.name === "firstName") setFirstName(e.target.value);
    else if (e.target.name === "lastName") setLastName(e.target.value);
    else if (e.target.name === "role") setRole(e.target.value);
    else if (e.target.name === "specialization") setSpecialization(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
  }
  async function Adduser(e) {
   
    try {
      e.preventDefault();
      let response = await axios.post(
        "http://localhost:8000/users/adduser",
        {
          firstName: firstName,
          lastName: lastName,
          role: role,
          specialization : specialization,
          password: password,
          email: email,
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
      <div className="mt-10 sm:mt-0">
        <div className="md:grid grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="px-2 sm:px-0">
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
                        required
                        type="text"
                        id="firstName"
                        onChange={(e) => onInputChange(e)}
                        name="firstName"
                        value={firstName}
                        autoComplete="country-name"
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
                        required
                        type="text"
                        onChange={(e) => onInputChange(e)}
                        value={lastName}
                        id="lastName"
                        name="lastName"
                        autoComplete="lastName-name"
                        className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        onChange={(e) => onInputChange(e)}
                        value={email}
                        id="email"
                        name="email"
                        autoComplete="email-name"
                        className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex gap-2 justify-between"><div className="col-span-6  sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
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
                        name="role"
                        value={role}
                        onChange={(e) => onInputChange(e)}
                      >
                        <option value="Docteur" className="">
                          Docteur
                        </option>
                        <option value="Assistance" className=" ">
                          Assistance
                        </option>
                      </select>
                    </div>
                    {role=="Docteur" ? <div className="" >
                    <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
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
                        <option value="Physical medicine and rehabilitation" className=" ">
                        Physical medicine and rehabilitation
                        </option>
                        <option value="Psychiatry" className=" ">
                        Psychiatry
                        </option>
                        <option value="Surgery" className=" ">
                        Surgery
                        </option>
                      </select>
                    </div>:null}</div>
                    
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        required
                        type="password"
                        onChange={(e) => onInputChange(e)}
                        value={password}
                        id="password"
                        name="password"
                        className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="px-4 py-3  text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={(e)=>Adduser(e)}
                    >
                      Save
                    </button>
                    <Snackbar ref={snackbarRef} message={msg} type={result} />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
