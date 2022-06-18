import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Snackbar from "../components/Notification";
import Loader from "../components/Loading";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
const SnackbarType = {
  success: "success",
  fail: "fail",
};

export default function Visit() {
  const [visits, setVisit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [count, setCount] = useState();
  const [result, setResult] = useState();
  const [msg, setMsg] = useState("");

  const snackbarRef = useRef(null);

  let { id } = useParams();
  useEffect(() => {
    async function getVisits() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/visits", {
          headers: {
            Authorization:
              "Bearer " + localStorage.getItem("user_token", "role"),
          },
        });

        let { rows } = response.data;
        setVisit(rows);
        let { count } = response.data;
        setCount(count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    getVisits();
  }, []);
  async function handleDeleteClick(visitId) {
    window.location.reload();
    try {
      let response = await axios.delete(
        "http://localhost:8000/visits/" + visitId,
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
      setLoading(false);
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
  const currentPosts = visits.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div>
      <div className="grid grid-rows-5 grid-cols-5 ">
        <div className="col-span-5 row-span-5">
          <div className=" bg-gray-100">
            <div className="font-bold leading-snug text-right px-2 py-2 ">
              <span className="text-blue-800">{count} </span> Visits
            </div>
            <div className="flex justify-start">
              <div className="px-5 ">
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-700"
                >
                  Specialization
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
                  onChange={(e) => {
                    setSpecialization(e.target.value.toLowerCase());
                  }}
                >
                  <option value="General" className="">
                    General
                  </option>
                  <option value="Allergy and immunology" className="">
                    Allergy and immunology
                  </option>
                  <option value="Dermatology" className="">
                    Dermatology
                  </option>
                  <option value="Family Doctor" className=" ">
                    Family Doctor
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
                  <option
                    value="Physical Doctor and rehabilitation"
                    className=" "
                  >
                    Physical Doctor and rehabilitation
                  </option>
                  <option value="Psychiatry" className=" ">
                    Psychiatry
                  </option>
                  <option value="Surgery" className=" ">
                    Surgery
                  </option>
                </select>{" "}
              </div>{" "}
              <div className=" px-[-100px] pt-[26px]">
                {" "}
                <button
                  className="w-fit h-fit"
                  onClick={(e) => setSpecialization("")}
                >
                  <FontAwesomeIcon
                    icon={faXmarkSquare}
                    size="1px"
                    color="#193152"
                  />
                </button>
              </div>
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
            <h1 className="text-xl py-2 px-5 text-blue-800 mb-2">
          {" "}
          <Link to={"/visits"}>
            <a
              href=""
              className="px-3 py-2 flex items-center text-xl  font-bold leading-snug  hover:opacity-75"
            >
              Visits
            </a>
          </Link>{" "}
        </h1>

            <div className="overflow-auto px-10 pb-10 rounded-lg shadow hidden md:block">
              <table className=" origin-center	">
                <thead className="bg-gray-50 border-b-2 border-gray-300">
                  <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                      Index
                    </th>
                    <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                      Full Name
                    </th>
                    <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                      Docteur Name
                    </th>
                    <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                      Date Visit
                    </th>
                    <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">
                      Specialization
                    </th>
                    <th className="p-3 min-w-96 text-sm font-semibold tracking-wide text-left">
                      Motif
                    </th>
                    <th className="p-3 min-w-96 text-sm font-semibold tracking-wide text-left">
                      interrogatoire
                    </th>
                    <th className="p-3 min-w-96 text-sm font-semibold tracking-wide text-left">
                      Conclusion
                    </th>
                    <th className="p-3  text-sm font-semibold tracking-wide text-left">
                      Prix
                    </th>
                   
                    <th className="p-3 text-sm font-semibold tracking-wide text-left"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {visits
                    .filter((visit) => {
                      if (search == "") {
                        return visit;
                      }
                      if (
                        visit.Patient.firstName
                          .toLowerCase()
                          .includes(search) ||
                        visit.Patient.lastName.toLowerCase().includes(search)
                      ) {
                        return visit;
                      }
                    })
                    .filter((visit) => {
                      if (specialization == "") {
                        return visit;
                      } else if (
                        visit.User.specialization
                          .toLowerCase()
                          .includes(specialization)
                      ) {
                        return visit;
                      }
                    })
                    .map((visit, index) => (
                      <tr className={ index%2 == 0 ? "bg-white" : "text-gray-700" }>
                        <Link to={"/visits/" + visit.id}>
                          <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                            <a
                              className="font-bold text-blue-500 hover:underline"
                              href=""
                            >
                              {index}
                            </a>
                          </td>
                        </Link>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {`${visit.Patient.firstName} ${visit.Patient.lastName}`}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {`${visit.User.firstName} ${visit.User.lastName}`}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {new Date(visit.datevisit).toDateString()}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {visit.User.specialization}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {visit.motif}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {visit.interrogatoire}
                        </td>
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {visit.conclusion}
                        </td>
                        
                        <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                          {visit.prix}
                        </td>
                        <td className="flex flex-rows gap-2  p-3 text-sm text-gray-700 whitespace-nowrap">
                          <div className="">
                            {" "}
                            
                            <Link to={"/visits/" + visit.id}>
                              <button
                              className="inline-flex justify-center py-2 px-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >Details</button>
                            </Link>
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
                  totalPosts={visits.length}
                  paginate={paginate}
                />
              </span>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
