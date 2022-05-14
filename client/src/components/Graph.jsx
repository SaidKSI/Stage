// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import React, { useState, useEffect } from "react";
// import axios from 'axios'
// import {useParams} from "react-router-dom"
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function BarChart() {
//    const [weight, setWeight] = useState();
//   const [height, setHeight] = useState();
//   // const [datemesure, setDatemesure] = useState();
//    const [patient, setPatient] = useState();


//   async function getPatient(patientId) {
//     try {
//       let response = await axios.get(
//         "http://localhost:8000/patients/patientdetails/" + patientId,
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("user_token"),
//           },
//         }
//       );

//       let { payload } = response.data;
//       setPatient(payload);
//     } catch (err) {

//     }
//   }

//   let { id } = useParams();
//   useEffect(() => {
//     try {
//       let pid = parseInt(id);
//       getPatient(pid);
//     } catch (err) {
//       alert("not found");
//     }
//   }, []);

// setWeight(patient.weight)
// setHeight(patient.height)

//   const [chartData, setChartData] = useState({
//     datasets: [weight,height],
//   });

//   const [chartOptions, setChartOptions] = useState({});

//   useEffect(() => {
//     setChartData({
//       labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
//       datasets: [
//         {
//           label: "Whom'st let the dogs out",
//           data: [12, 55, 34, 120, 720],
//           borderColor: "rgb(53, 162, 235)",
//           backgroundColor: "rgba(53, 162, 235, 0.4)",
//         },
//       ],
//     });
//     setChartOptions({
//       responsive: true,
//       plugins: {
//         legend: {
//           position: "top",
//         },
//         title: {
//           display: true,
//           text: "Whom'st let the dogs out",
//         },
//       },
//     });
//   }, []);

//   return (
//     <div className="App">
//       <Bar options={chartOptions} data={chartData} />
//     </div>
//   );
// }

// export default BarChart;
