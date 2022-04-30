import axios from "axios";
import React from "react";
import { useState } from "react";
import Dialog from "./Msg";

export default function AddPatient() {
  const [isShowDialog, setIsShowDialog] = useState(false);
  
  const [total, setTotal] = useState()
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [cin, setcin] = useState("");


  

  function onInputChange(e) {
    if (e.target.name === "firstName") setfirstName(e.target.value);
    else if (e.target.name === "lastName") setlastName(e.target.value);
    else if (e.target.name === "cin") setcin(e.target.value);
  }
  // async function onSubmit(e) {
    
    
  // }

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
          Add Patient
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
  // async function handleSubmit(){
  //   await onSubmit(e)
  // }
  const handleSubmit =async (e) => {
    e.preventDefault();

    let response = await axios.post(
      "http://localhost:8000/patients/addpatient",
      {
        firstName: firstName,
        lastName: lastName,
        cin: cin,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("user_token"),
        },
      }
    );
    // // Handle submit....
  
    };
  
    const handleCloseDialog = () => {
      setIsShowDialog(!isShowDialog);
    };
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
                        type="text"
                        onChange={(e) => onInputChange(e)}
                        value={lastName}
                        id="lastName"
                        name="lastName"
                        autoComplete="lastName-name"
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
                        type="number"
                        onChange={(e) => onInputChange(e)}
                        value={cin}
                        id="cin"
                        name="cin"
                        autoComplete="cin-name"
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* <div className="">
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
</div>; */}
