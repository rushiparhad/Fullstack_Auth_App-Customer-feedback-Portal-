import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const api = axios.create({ baseURL: `${BASE_URL}` });
export const apiAuth = axios.create({ baseURL: `${BASE_URL}` });
apiAuth.interceptors.request.use((config)=>{
  const token = localStorage.getItem("token");
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
