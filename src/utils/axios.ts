import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/",
  timeout: Number(10000),
});

export default axiosInstance;
