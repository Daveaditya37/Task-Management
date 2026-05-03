import axios from "axios";

import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";


// ======================================
// AXIOS INSTANCE
// ======================================

export const api: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
  },
});


// ======================================
// REQUEST INTERCEPTOR
// ======================================

api.interceptors.request.use(
  (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {

    // GET TOKEN
    const token = localStorage.getItem("token");

    // ATTACH TOKEN
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


// ======================================
// RESPONSE INTERCEPTOR
// ======================================

api.interceptors.response.use(

  (
    response: AxiosResponse
  ): AxiosResponse => response,

  async (
    error: AxiosError
  ): Promise<never> => {

    // UNAUTHORIZED
    if (error.response?.status === 401) {

      // CLEAR STORAGE
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // REDIRECT
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);