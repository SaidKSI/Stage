import React, { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Snackbar from "../components/Notification";
import Loader from "../components/Loading";
import Pagination from "../components/Pagination";

const SnackbarType = {
  success: "success",
  fail: "fail",
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState();
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);

  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        let response = await axios.get("/api/users", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });
        
        let { rows } = response.data;
        setUsers(rows);
        let { count } = response.data;
        setCount(count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    

    getUser();
  }, []);
  async function handleDeleteClick(userId) {
    window.location.reload();
    try {
      
      let response = await axios.delete(
        "/api/users/" + userId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );
      if (response.status === "failed") {
        setResult(SnackbarType.fail);
        setMsg("something went wrong");
        return result, msg;
      }
      setResult(SnackbarType.success);
      setMsg("patient added");
      return result, msg;
    } catch (err) {
      setLoading(false);
    }
  }

  //PAGINITION
  //const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
 // Get current posts
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    loading ? 
    (<div> <Loader /> </div>) : (
    <div className="">
      <div>
      </div>
      <div className=" bg-gray-100">
      <div className="font-bold leading-snug text-right px-2 py-2 ">
         <span className="text-blue-800">{count} </span>  Users 
        </div>
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
                <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
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
                    <td className="flex flex-rows gap-2  p-3 text-sm text-gray-700 whitespace-nowrap">
                          <div className="">
                            {" "}
                            <button
                              onClick={() => handleDeleteClick(user.id)}
                              type="submit"
                              className="inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Delete
                            </button>
                            <Snackbar
                              ref={snackbarRef}
                              message={msg}
                              type={result}
                            />
                          </div>
                        </td>
                  
                  </tr>
                ))}
            </tbody>
          </table>
          <span className="flex justify-center py-5 ">
                <Pagination
                postsPerPage={postsPerPage}
                totalPosts={users.length}
                paginate={paginate}
              />
                </span>
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
    </div>
    )
  );
}
