// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api", // local backend
  withCredentials: true, // optional
});

export default API;
