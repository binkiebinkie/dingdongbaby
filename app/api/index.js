import axios from "axios";
import {
  getManufacturer,
  getModel,
  getSystemName,
  getUniqueId,
} from "react-native-device-info";
import { storeToken, getToken } from "../storage";
import { auth } from "./auth";
// const baseURL = `http://${process.env.REACT_APP_LOCAL_IP}:${process.env.REACT_APP_LOCAL_SERVER_PORT}/api/`;
const baseURL = `http://localhost:5000/api/`;

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

export const authenticateDevice = async () => {
  try {
    const deviceId = await getUniqueId();
    const manufacturer = await getManufacturer();
    const model = await getModel();
    const systemName = await getSystemName();

    const uid = `${deviceId}-${manufacturer}-${model}-${systemName}`;
    console.log("uid,", uid);
    const response = await auth({
      uid,
    });
    console.log("resp", response);
    const { token, user } = response.data;
    console.log("token", token);

    await storeToken(token);
    return user;
  } catch (error) {
    console.error("Error during device authentication:", error);
  }
};
