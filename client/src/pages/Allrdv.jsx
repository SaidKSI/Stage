import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Snackbar from "../components/Notification";
import Loader from "../components/Loading";
import Pagination from "../components/Pagination";


const SnackbarType = {
  success: "success",
  fail: "fail",
};

export default function Allrdv() {
  const [rdvs, setrdvs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState();
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);
  useEffect(() => {
    async function getAllRdv() {
      try {
        
        setLoading(true);
        let response = await axios.get("http://localhost:8000/rdvs", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });

        let { rows } = response.data;
        setrdvs(rows);
        let { count } = response.data;
        setCount(count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getAllRdv();
  }, []);
  async function handleDeleteClick(rdvId) {
    window.location.reload();
    try {
      let response = await axios.delete(
        "http://localhost:8000/rdvs/" + rdvId,
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
 const currentPosts = rdvs.slice(indexOfFirstPost, indexOfLastPost);

 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);
  
  return ( loading ?
    (<div> <Loader/> </div>) : (
    <div>
      <div className="grid grid-rows-5 grid-cols-5 ">
        <div className="col-span-5 row-span-5">
          <div className=" bg-gray-100">
            <div className="font-bold leading-snug text-right px-2 py-2 ">
              <span className="text-blue-800">{count} </span> Rdvs
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
            <h1 className="text-xl py-1 px-5 text-blue-800 mb-2">RDVs</h1>

            <div className="overflow-auto px-60 pb-10 rounded-lg shadow hidden md:block">
              <table className=" origin-center	">
                <thead className="bg-gray-50 border-b-2 border-gray-300">
                  <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                      Index
                    </th>
                    <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                      Full Name
                    </th>
                    <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                      Time RDV
                    </th>
                    <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                      Date RDV
                    </th>
                    <th className="p-3 w-60 text-sm font-semibold tracking-wide text-left">
                      Motif
                    </th>
                  
                    <th className="p-3  text-sm font-semibold tracking-wide text-left"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {rdvs
                    .filter((rdv, index) => {
                      if (search == "") {
                        return rdv;
                      } else if (
                        rdv.Patient.firstName.toLowerCase().includes(search) ||
                        rdv.Patient.lastName.toLowerCase().includes(search)
                      ) {
                        return rdv;
                      }
                    })
                    .map((rdv, index) => (
                      <tr>
                        
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a
                              className="font-bold text-blue-500 hover:underline"
                              href=""
                            >
                              {index}
                            </a>
                          </td>
                       
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {`${rdv.Patient.firstName} ${rdv.Patient.lastName}`}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {rdv.timerdv}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {new Date(rdv.daterdv).toDateString()}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {rdv.motif}
                        </td>
                        <td className="flex flex-rows gap-2  p-3 text-sm text-gray-700 whitespace-nowrap">
                          <div className="">
                            {" "}
                            <button
                              onClick={() => handleDeleteClick(rdv.id)}
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
                totalPosts={rdvs.length}
                paginate={paginate}
              />
                </span>
              <div className="py-10">
                <Link to={"/rdvs/addrdv"}>
                  <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Add RDV
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  );
}
