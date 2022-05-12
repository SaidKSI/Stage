import axios from "axios";
import React from "react";
import { useState, useRef } from "react";
import Snackbar from "./Notification";

const SnackbarType = {
  success: "success",
  fail: "fail",
};
export default function AddPatient() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [cin, setcin] = useState("");
  const [gender, setGender] = useState("");
  const [dateN, setDateN] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");


  const snackbarRef = useRef(null);

  function onInputChange(e) {
    if (e.target.name === "firstName") setfirstName(e.target.value);
    else if (e.target.name === "lastName") setlastName(e.target.value);
    else if (e.target.name === "cin") setcin(e.target.value);
    else if (e.target.name === "gender") setGender(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "dateN") setDateN(e.target.value);
   

  }
  
  async function onSubmit(e) {
    window.location.reload();
    try {snackbarRef.current.show();
    e.preventDefault();

    let response = await axios.post(
      "/api/patients/addpatient",
      {
        firstName: firstName,
        lastName: lastName,
        cin: cin,
        gender: gender,
        email: email,
        dateN: dateN
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
    }
    catch {
      setResult(SnackbarType.fail);
      setMsg("something went wrong");
      return result, msg;
    }
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
                      required
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
                      required

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
                      required

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
                        htmlFor="dateN"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date De Naissance
                      </label>
                      <input
                        type="date"
                      required

                        onChange={(e) => onInputChange(e)}
                        value={dateN}
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
                      required

                        onChange={(e) => onInputChange(e)}
                        value={email}
                        id="email"
                        name="email"
                        className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <br />
                    <div className="col-span-6 px-10 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Gender
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
                        name="gender"
                        value={gender}
                        onChange={(e) => onInputChange(e)}
                      >
                        <option value="Male" className="">
                          Male
                        </option>
                        <option value="Femme" className=" ">
                          Femme
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="">
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
