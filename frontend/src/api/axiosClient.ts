import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
  },
});
