import axiosInstance from "./axiosInstance";

interface Credentials {
    username: string;
    password: string;
}

export const login = async (credentials: Credentials) => {
    try {
        const res = await axiosInstance.post("/login", credentials);
        return res.data;
    } catch (error) {
        throw error;
    }
}