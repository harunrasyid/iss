import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://api.open-notify.org/iss-now.json",
  timeout: Number(10000),
});

export default axiosInstance;
