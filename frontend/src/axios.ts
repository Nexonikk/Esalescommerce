import axios from "axios";

export const axiosBase = axios.create({
  baseURL: "esalescommerce-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
