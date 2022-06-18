import { useState } from "react";
import "./App.css";


import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Layout from "./components/Layout";
import PatientList from "./pages/PatientList";
import Privateroute from "./components/privateroute";
import AddPatient from "./components/AddPatient";
import PatientDetails from "./components/PatientDetails";
import Visit from "./pages/Visit";
import AddVisit from "./components/AddVisit";
import AddRDV from "./components/AddRDV";
import Allrdv from "./pages/Allrdv"
import Home from "./pages/Home";
import Paiment from "./pages/Paiment";
import Addpayment from "./components/Addpayment";
import VisitDetails from "./components/VisitDetails";
import Adduser from "./components/Adduser"
import Users from "./pages/Users"
import UpdatePatients from "./components/UpdatePatient";
import PatientContact from "./components/PatientContact";
import BarChart from "./components/Graph";




function App() {


  return (
    <BrowserRouter>
    <Routes>
      
      
                            {/* Home */}
      <Route path="/" element={<Privateroute><Home /></Privateroute> } /> 
                      {/* Patients */}
      <Route path="/patients" element={<Privateroute><Layout><PatientList /></Layout></Privateroute>} /> 
      <Route path="/patients/addpatient" element={<Privateroute><Layout><AddPatient /></Layout></Privateroute>} /> 
      <Route path="/patients/:id" element={<Privateroute><Layout><PatientDetails /></Layout></Privateroute>} /> 
      <Route path="/patients/updatepatient/:id" element={<Privateroute><Layout><UpdatePatients /></Layout></Privateroute>} /> 
      <Route path="/patients/patientcontact/:id" element={<Privateroute><Layout><PatientContact /></Layout></Privateroute>} /> 
      <Route path="/patients/patientdetails/:id" element={<Privateroute><Layout><BarChart /></Layout></Privateroute>} /> 
      
      
                        {/* Visits */}
      <Route path="/visits" element={<Privateroute><Layout><Visit /></Layout></Privateroute>} /> 
      <Route path="/visits/:id" element={<Privateroute><Layout><VisitDetails/></Layout></Privateroute>} /> 
      <Route path="/visits/addvisit/:patientId" element={<Privateroute><Layout><AddVisit /></Layout></Privateroute>} /> 
      
                {/* RDVs */}
      {/* <Route path="/rdvs/:id" element={<Privateroute><Layout><RDVlist /></Layout></Privateroute>} /> */}
      <Route path="/rdvs" element={<Privateroute><Layout><Allrdv /></Layout></Privateroute>} /> 
      <Route path="/rdvs/:id" element={<Privateroute><Layout><PatientDetails /></Layout></Privateroute>} /> 
      <Route path="/rdvs/addrdv/:patientId" element={<Privateroute><Layout><AddRDV/></Layout></Privateroute>} /> 

                  {/* Payments */}
      <Route path="/payments" element={<Privateroute><Layout><Paiment /></Layout></Privateroute>} /> 
      <Route path="/payments/:id" element={<Privateroute><Layout><PatientDetails /></Layout></Privateroute>} /> 
      {/* <Route path="/payments/addpayment" element={<Privateroute><Layout><Addpayment/></Layout></Privateroute>} />  */}
      <Route path="/payments/addpayment/:id" element={<Privateroute><Layout><Addpayment/></Layout></Privateroute>} /> 
      


     




      <Route path="/users/adduser" element={<Privateroute><Layout><Adduser/></Layout></Privateroute>} /> 
      <Route path="/users" element={<Privateroute><Layout><Users/></Layout></Privateroute>} /> 

      <Route path="/login" element={<Login />} /> 
      <Route path="*" exact element={<Navigate to="/"  />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
