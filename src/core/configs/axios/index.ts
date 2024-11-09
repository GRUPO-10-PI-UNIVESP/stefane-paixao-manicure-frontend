import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    "https://orca-app-8cyky.ondigitalocean.app/stefane-paixao-manicure-backend",
});

export default axiosInstance;
