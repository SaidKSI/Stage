import axios from "axios";

const baseURL = "http://localhost:8000";
const publicAxios = axios.create({
  baseURL: baseURL,
});

const priteAxios = axios.create({
  baseURL: baseURL,
});

priteAxios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("user_token");
  config.headers.Authorization = token;

  return config;
});

export const api = {
  login: async function (credentials) {
    try {
      let res = await publicAxios.post("", credentials);
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  patients: async function () {
    try {
      let res = await priteAxios.get();
      return res.data;
    } catch (err) {
      throw err;
    }
  },
};
