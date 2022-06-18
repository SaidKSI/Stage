import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";

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
    e.preventDefault();

    try {
      let response = await axios.post("http://localhost:8000/login", {
        email: email.trim(),
        password: password,
      });
      let role = response.data.role;
      let token = response.data.token;
      let userid = response.data.userid;
      let userName = `${response.data.firstName} ${response.data.lastName}`;

      localStorage.setItem("user_token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userid", userid);
      localStorage.setItem("userName", userName);
      
      navigate("/");
    } catch (err) {
      alert("Email ou nom d'utilisateur est incorecte");
    }
  }
  useEffect(() => {}, []);

  useEffect(() => {}, [email]);

  return localStorage.getItem("user_token") ? (
    <Navigate to={"/"} />
  ) : (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <span className="flex items-center justify-center ">
            <FontAwesomeIcon icon={faHospital} size="6x" color="#193152" />
          </span>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => onInputChange(e)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => onInputChange(e)}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
              />
            </div>
          </div>
          <div>
            <button
              onClick={(e) => onSubmit(e)}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white sm:bg-[#193152] hover:bg-[#0f1e33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
