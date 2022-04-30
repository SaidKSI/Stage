import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Time from "../components/Time";
export default function PatientList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });

        let list = response.data;
        setUsers(list);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getUser();
  }, []);

  return (
    <div className="">
      <div>
        <div className="text-right text-lg">
          <Time></Time>
        </div>
      </div>
      <div className=" bg-gray-100">
        <div className="px-5 py-5">
          <input
            autoComplete="off"
            type="search"
            name="search"
            className="mt-1 block w-40 py-2 px-3 border   border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
            }}
            placeholder="Search...."
          />
        </div>
        <h1 className="text-xl py-2 px-5 text-blue-800 mb-2">Users</h1>
        <div className="overflow-auto px-60 pb-10 rounded-lg shadow hidden md:block">
          <table className=" origin-center	">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Index
                </th>

                <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                  Full Name
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Role
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Email
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Password
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users
                .filter((user) => {
                  if (search == "") {
                    return user;
                  } else if (
                    user.firstName.toLowerCase().includes(search) ||
                    user.lastName.toLowerCase().includes(search)
                  ) {
                    return user;
                  }
                })
                .map((user, index) => (
                  <tr>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {index}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {`${user.firstName} ${user.lastName}`}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">{user.role}</td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap"> {user.email} </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap"> {user.password} </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="py-10">
          <Link to={"/users/adduser"}>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add User
            </button>
          </Link>
        </div>
      </div>

      <div>{loading ? <p>Chargement...</p> : ""}</div>
    </div>
  );
}
