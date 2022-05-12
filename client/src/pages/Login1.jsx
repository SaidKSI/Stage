import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";



export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let navigate = useNavigate();

  function onInputChange(e) {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
  }

  async function onSubmit(e) {
    // let user=jsonUsersList.find(x=>x.email===email && x.password===password)

    try {
      

      let response = await axios.post(
        "/api/login",
        {
          email: email,
          password: password
        
        }
      );
      let role = response.data.role
      let token=response.data.token
      let userName = `${response.data.firstName} ${response.data.lastName}`
      
      
      
      localStorage.setItem("user_token", token);
      localStorage.setItem("role",role)
      localStorage.setItem("userName",userName)
      navigate("/");
    } catch (err) {
      alert("Email ou nom d'utilisateur est incorecte");
    }
  }
  useEffect(() => {
    
  }, []);

  useEffect(() => {}, [email]);
  
  return (
    localStorage.getItem("user_token") ?
    <Navigate to={'/'} />
    :
    <div className="container mx-auto h-screen flex  justify-center pt-[300px] ">
    <div className="flex flex-col space-y-[12px]">
      <label>Email</label>
      <input
      className="border border-solid border-black rounded-lg"
        type={"text"}
        name="email"
        value={email}
        onChange={(e) => onInputChange(e)}
      />
      <label>Password</label>
      <input
        className="border border-solid border-black rounded-lg"
        type={"password"}
        name="password"
        value={password}
        onChange={(e) => onInputChange(e)}
      />

      <button
        className="p-2 bg-blue-500 text-white rounded-lg"
        onClick={(e) => onSubmit(e)}
      >
        Login
      </button>
    </div>
  </div>
  );
}

