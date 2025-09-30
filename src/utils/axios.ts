import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/iss",
  timeout: Number(10000),
});

export default axiosInstance;
