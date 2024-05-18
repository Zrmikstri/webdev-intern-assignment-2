import axios from "axios";
import { json } from "react-router-dom";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
});

api.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem("TOKEN");

        if (token) {
            request.headers.Authorization = `Token ${token}`;
        }

        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;