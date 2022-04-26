import { useState } from "react";
import "./App.css";
import H1 from "./components/H1";
import Todos from "./components/Todos";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import TodosPage from "./pages/TodosPage";
import Login from "./pages/Login";
import Menu from "./components/Menu";
import Layout from "./components/Layout";
import PatientList from "./pages/PatientList";
import Privateroute from "./components/privateroute";
import AddPatient from "./components/AddPatient";
import PatientDetails from "./components/PatientDetails";
import Visit from "./pages/Visit";
import AddVisit from "./components/AddVisit";
import AddRDV from "./components/AddRDV";
import RDVlist from "./components/RDVlist";
import Allrdv from "./components/Allrdv"
import Home from "./pages/Home";
import Paiment from "./pages/Paiment";
import Addpayment from "./components/Addpayment";



function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Privateroute><Layout><Home /></Layout></Privateroute> } /> 

      <Route path="/patients" element={<Privateroute><Layout><PatientList /></Layout></Privateroute>} /> 
      <Route path="/patients/addpatients" element={<Privateroute><Layout><AddPatient /></Layout></Privateroute>} /> 
      <Route path="/patients/:id" element={<Privateroute><Layout><PatientDetails /></Layout></Privateroute>} /> 
      <Route path="/visit" element={<Privateroute><Layout><Visit /></Layout></Privateroute>} /> 
      <Route path="/visit/addvisit" element={<Privateroute><Layout><AddVisit /></Layout></Privateroute>} /> 
      {/* <Route path="/rdvs/:id" element={<Privateroute><Layout><RDVlist /></Layout></Privateroute>} /> */}
      <Route path="/allrdvs" element={<Privateroute><Layout><Allrdv /></Layout></Privateroute>} /> 
      <Route path="/payment" element={<Privateroute><Layout><Paiment /></Layout></Privateroute>} /> 
      <Route path="/payment/addpayment" element={<Privateroute><Layout><Addpayment/></Layout></Privateroute>} /> 


     





      <Route path="/login" element={<Login />} /> 
      <Route path="*" exact element={<Navigate to="/"  />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
