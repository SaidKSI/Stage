import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Paiment() {
  const [payments, setPayment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPayments() {
      try {
        setLoading(true);
        let response = await axios.get("http://localhost:8000/payment", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user_token"),
          },
        });

        let list = response.data;
        setPayment(list);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
     // const {rest}
    getPayments();
  }, []);
   
  return (
    <div className="grid grid-rows-5 grid-cols-5 ">
      <div className="col-span-5 row-span-5">
        <table className="table-auto m-5 ml-[25%] w-[1fr] ">
          <thead>
            <th className="border border-sky-500 p-5">index</th>
            <th className="border border-sky-500 p-5">Patient ID</th>
            <th className="border border-sky-500 p-5">Visit ID</th>
            <th className="border border-sky-500 p-5">Prix</th>
            <th className="border border-sky-500 p-5">Rest</th>
          </thead>
          <tbody className="border border-sky-500">
            {payments.map((payment, index) => (
              <tr>
                <td className="border border-sky-500 p-5">{index}</td>
                <td className="border border-sky-500 p-5">
                  {payment.patientId}
                </td>
                <td className="border border-sky-500 p-5">{payment.visitId}</td>
                <td className="border border-sky-500 p-5">{payment.prix}</td>
                <td className="border border-sky-500 p-5">{payment.rest}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="px-4 py-3 bg-gray-50 text-right mt-[15%] gap-5 sm:px-6 flex justify-start ">
          <Link to={"/payment/addpayment"}>
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Payment
            </button>
          </Link>
        </div>

        <div>{loading ? <p>Chargement...</p> : ""}</div>
      </div>
    </div>
  );
}
