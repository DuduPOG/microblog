import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

interface RetriableRequest extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

axiosInstance.interceptors.request.use((config) => {
    const access = localStorage.getItem("access");
    if (access) {
        config.headers.set("Authorization", `Bearer ${access}`);
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const request = error.config as RetriableRequest | undefined;
        const isAuthRequest = request?.url?.includes("/login/")
            || request?.url?.includes("/token/refresh/");

        if (error.response?.status !== 401 || !request || request._retry || isAuthRequest) {
            return Promise.reject(error);
        }

        const refresh = localStorage.getItem("refresh");
        if (!refresh) {
            localStorage.removeItem("access");
            window.dispatchEvent(new Event("auth:logout"));
            return Promise.reject(error);
        }

        request._retry = true;
        try {
            const response = await axios.post<{ access: string }>(
                `${API_BASE_URL}token/refresh/`,
                { refresh },
            );
            localStorage.setItem("access", response.data.access);
            request.headers.set("Authorization", `Bearer ${response.data.access}`);
            return axiosInstance(request);
        } catch (refreshError) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.dispatchEvent(new Event("auth:logout"));
            return Promise.reject(refreshError);
        }
    },
);