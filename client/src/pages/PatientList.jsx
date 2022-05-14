import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Snackbar from "../components/Notification";
import Loader from "../components/Loading";
import Pagination from "../components/Pagination";

const SnackbarType = {
  success: "success",
  fail: "fail",
};
export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState();
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");



 
  const snackbarRef = useRef(null);

  useEffect(() => {
    async function getPatient() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/patients", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });

        let { rows } = response.data;
        setPatients(rows);
        let { count } = response.data;
        setCount(count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getPatient();
  }, []);
  async function handleDeleteClick(patientId) {
    window.location.reload();
    try {
      let response = await axios.delete(
        "http://localhost:8000/patients/" + patientId,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        }
      );
      setResult(SnackbarType.success);
      setMsg("patient added");
      return result, msg;
    } catch (err) {
      setResult(SnackbarType.fail);
      setMsg("something went wrong");
      return result, msg;
    }
  }
    //PAGINITION
  //const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
 // Get current posts
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = patients.slice(indexOfFirstPost, indexOfLastPost);

 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);
 
  useEffect(() => {}, []);
  return loading ? (
    <div>
      {" "}
      <Loader />{" "}
    </div>
  ) : (
    <div className="">
      <div className=" bg-gray-100">
        <div className="font-bold leading-snug text-right px-2 py-2 ">
          <span className="text-blue-800">{count} </span> Patients
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
        <h1 className="text-xl py-2 px-5 text-blue-800 mb-2">Patients</h1>
        <div className="overflow-auto px-60 pb-10 rounded-lg shadow hidden md:block">
          <table className=" origin-center	">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Index
                </th>
                <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  C.I.N
                </th>
                <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                  Full Name
                </th>
                <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                  Sexe
                </th>
                <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left nowrap">
                  Date Naissance
                </th>
                <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                  Email
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients
                .filter((patient) => {
                  if (search == "") {
                    return patient;
                  } else if (
                    patient.firstName.toLowerCase().includes(search) ||
                    patient.lastName.toLowerCase().includes(search)
                  ) {
                    return patient;
                  }
                })
                .map((patient, index) => (
                  <tr className={index/2 ==0 ?"bg-white": "text-gray-700" }>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {index}
                    </td>
                    <Link to={"/patients/" + patient.id}>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <a
                          className="font-bold text-blue-500 hover:underline"
                          href=""
                        >
                          {patient.cin}
                        </a>
                      </td>
                    </Link>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {`${patient.firstName} ${patient.lastName}`}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {patient.gender}
                    </td>

                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {new Date(patient.dateN).toDateString()}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {patient.email}
                    </td>
                    <td className="flex justify-start gap-2 text-sm text-gray-700 whitespace-nowrap">
                      <div className="">
                        {" "}
                        <button
                          onClick={() => handleDeleteClick(patient.id)}
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
                      <div className="">
                        <Link to={"/patients/updatepatient/" + patient.id}>
                          <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                
              
            </tbody>
           
          </table>
           
        </div>
        <span className="flex justify-center py-5 ">
                <Pagination
                postsPerPage={postsPerPage}
                totalPosts={patients.length}
                paginate={paginate}
              />
                </span>
        <div className="py-10">
          <Link to={"/patients/addpatient"}>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Patients
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
