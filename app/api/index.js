import axios from "axios";
import { getToken } from "../storage";

const baseURL = `http://localhost:5000/api/`; // for web dev
// const baseURL = `http://192.168.1.16:5000/api/`; // for iOS dev; to get IP:
// const baseURL = `http://192.168.0.32:5000/api/`;
// in terminal use command ifconfig
// Look for en0 or en1 and find the inet value which is your local IP address

export const api = axios.create({
  //   baseURL: `http://localhost:5000/api/`,
  baseURL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error?.response?.status === 401) {
    }
    return Promise.reject(error);
  }
);

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  console.log("Token retrieved by getToken():", token);

  if (token && token !== "undefined") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
