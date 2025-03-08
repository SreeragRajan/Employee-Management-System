import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://employee-management-system-leed.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})