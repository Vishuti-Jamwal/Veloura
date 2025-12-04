import axios from 'axios';

const API = axios.create({
    baseURL: 'https://veloura-lpqn.onrender.com/api', // Update this if deploying
});

// Add a request interceptor to attach the token
API.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;
