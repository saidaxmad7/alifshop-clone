import axios, { AxiosInstance } from "axios";

export const Axios: AxiosInstance = axios.create({
  baseURL: "https://dac4d96cc495e5de.mokky.dev",
});

export default Axios;
