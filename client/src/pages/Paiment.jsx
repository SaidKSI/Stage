import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Time from "../components/Time";
export default function Paiment() {
  const [payments, setPayment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [count, setCount] = useState();


  useEffect(() => {
    async function getPayments() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/payments", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });

        let { rows } = response.data;
        setPayment(rows);
        let { count } = response.data;
        setCount(count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
     // const {rest}
    getPayments();
  }, []);
  
  return (
    <div>
      
    <div className="grid grid-rows-5 grid-cols-5 ">
      <div className="col-span-5 row-span-5">
        <div className=" bg-gray-100">
        <div className="font-bold leading-snug text-right px-2 py-2 ">
         <span className="text-blue-800">{count} </span>  Payment 
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
          <h1 className="text-xl py-1 px-5 text-blue-800 mb-2">Paiment</h1>

          <div className="overflow-auto px-32	 rounded-lg shadow hidden md:block">
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
                    Visit ID
                  </th>
                  <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                    Prix
                  </th>
                  <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                    Montant
                  </th>
                  <th className="p-3 w-40 text-sm font-semibold tracking-wide text-left">
                    Rest
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {payments
                .filter((payment, index) => {
                  if (search == "") {
                    return payment
                  } else if (
                    payment.Patient.firstName.toLowerCase().includes(search) || payment.Patient.lastName.toLowerCase().includes(search)
                  ) {
                    return payment
                  }
                })
                .map((payment, index) => ( 
                  <tr >
                    <Link to={"/payment/" + payment.id}>
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
                      {`${payment.Patient.firstName} ${payment.Patient.lastName}`}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {payment.visitId}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {payment.Visit.prix}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {payment.montant}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {payment.Visit.prix-payment.montant  }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="py-10">
              <Link to={"/payments/addpayment"}>
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Add Payment
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>{loading ? <p>Chargement...</p> : ""}</div>
      </div>
    </div>
    </div>
  );
}
