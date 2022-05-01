import axios from "axios";
import React from "react";
import { useState } from "react";
import Dialog from "./Msg";

export default function AddPatient() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [cin, setcin] = useState("");

  function onInputChange(e) {
    if (e.target.name === "firstName") setfirstName(e.target.value);
    else if (e.target.name === "lastName") setlastName(e.target.value);
    else if (e.target.name === "cin") setcin(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    let response = await axios.post(
      "http://localhost:8000/patients/addpatient",
      {
        firstName: firstName,
        lastName: lastName,
        cin: cin
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    ); 
  }
  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
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
                        value={firstName}
                      
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
                        value={lastName}
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
                        value={cin}
                        id="cin"
                        name="cin"
                        autoComplete="cin-name"
                        className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <br />
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="cin"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date De Naissance
                      </label>
                      <input
                        type="date"
                        onChange={(e) => onInputChange(e)}
                        //value={dateN}
                        id="cin"
                        name="cin"
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
                        //value={email}
                        id="eemail"
                        name="email"
                        autoComplete="Email-name"
                        className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <br />
                      <div className="flex justify-evenly  col-span-6 sm:col-span-3">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                            for="Homme"
                          >
                            Homme
                          </label>
                          <input
                            type="radio"
                            id="Homme"
                            name="Homme"
                           
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                            for="Femme"
                          >
                            Femme
                          </label>
                          <input
                            type="radio"
                            id="Femme"
                            name="Femme"
                            
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="px-4 py-3  text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={onSubmit}
                    >
                      Save
                    </button>
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

{
  /* <div className="">
  <div className="px-4 py-3  text-right sm:px-6">
    <button
      type="submit"
      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={handleCloseDialog}
    >
      Save
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
      Dialog Content goes here...
    </Dialog>
  )}
</div>; */
}
