import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://employee-management-system-793m.vercel.app/api",
    withCredentials: true,
})