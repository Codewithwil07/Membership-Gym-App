import api from "./axios";

export const authService = {
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  register: (data: { username: string; email: string; password: string; no_hp: string }) =>
    api.post("/auth/register", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
};
