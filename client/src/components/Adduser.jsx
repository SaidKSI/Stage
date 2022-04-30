import React, { useState } from 'react'
import axios from 'axios';

export default function Adduser() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function onInputChange(e) {
        if (e.target.name === "firstName") setFirstName(e.target.value);
        else if (e.target.name === "lastName") setLastName(e.target.value);
        else if (e.target.name === "role") setRole(e.target.value);
        else if (e.target.name === "email") setEmail(e.target.value);
        else if (e.target.name === "password") setPassword(e.target.value);
      }
      async function Adduser(){
     

      let response = await axios.post(
        "http://localhost:8000/patients/addpatient",
        {
          firstName: firstName,
          lastName: lastName,
          role: role,
          password : password,
          email : email
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );
      
    
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
                      Role
                    </label>
                   <select name='role' value={role} onChange={(e) => onInputChange(e)}>
                       <option value="Docteur" >Docteur</option>
                       <option value = "Assistance" >Assistance</option>
                       
                   </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      onChange={(e) => onInputChange(e)}
                      value={email}
                      id="email"
                      name="email"
                      autoComplete="email-name"
                      className="mt-1 block w-full py-2 px-3 border  border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      onChange={(e) => onInputChange(e)}
                      value={lastName}
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
                    onClick={Adduser}
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
  )
}
