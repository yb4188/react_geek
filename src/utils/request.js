import axios from "axios";
import { getToken } from "./storage";

export const baseURL = "http://geek.itheima.net/v1_0/";
const request = axios.create({
  baseURL,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers.Authorization = `Beaear ${getToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
