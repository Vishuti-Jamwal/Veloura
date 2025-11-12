
import API from "./api";


export const signup = async (userData) => {
  try {
    const res = await API.post("/voter/signup", userData);
    return res.data; // returns message, token, and user
  } catch (err) {
    console.error("Signup error:", err.response?.data || err.message);
    throw err;
  }
};


export const login = async (userData) => {
  try {
    const res = await API.post("/voter/login", userData);
    return res.data; // returns message, token, and user
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};
