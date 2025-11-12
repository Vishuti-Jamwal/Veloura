import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/voter",
  withCredentials: true,
});

export const signup = (data) => API.post("/signup", data);
export const login = (data) => API.post("/login", data);

