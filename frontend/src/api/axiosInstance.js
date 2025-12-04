import axios from 'axios';

const API = axios.create({
    baseURL: 'https://veloura-lpqn.onrender.com/api', // Update this if deploying
});

// Add a request interceptor to attach the token
API.interceptors.request.use(
    (config) => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user && user.token) {
                    config.headers.Authorization = `Bearer ${user.token}`;
                }
            } catch (error) {
                console.error("Invalid user data in localStorage", error);
                // Optionally clear invalid data
                // localStorage.removeItem('user'); 
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;

// Add a response interceptor to handle 401 errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
