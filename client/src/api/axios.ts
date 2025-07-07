import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true,
});
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // user unauthorized, biarkan error dilempar ke catch
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default api;
