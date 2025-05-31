import axios from "axios";

export const axiosBase = axios.create({
  baseURL: "https://esalescommerce-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});
