import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json", Accept: "application/json" }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("udc-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("udc-token");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

// Auth
export const authService = {
  login: (data) => api.post("/login", data),
  logout: () => api.post("/logout"),
  me: () => api.get("/me")
};

// Dashboard
export const dashboardService = {
  getStats: () => api.get("/dashboard/stats")
};

// Divisi
export const divisiService = {
  getAll: () => api.get("/divisi"),
  getById: (id) => api.get(`/divisi/${id}`),
  create: (data) => api.post("/divisi", data),
  update: (id, data) => api.put(`/divisi/${id}`, data),
  delete: (id) => api.delete(`/divisi/${id}`)
};

// Anggota
export const anggotaService = {
  getAll: (params) => api.get("/anggota", { params }),
  getById: (id) => api.get(`/anggota/${id}`),
  create: (data) =>
    api.post("/anggota", data, {
      headers: { "Content-Type": "multipart/form-data" }
    }),
  update: (id, data) =>
    api.post(
      `/anggota/${id}`,
      { ...data, _method: "PUT" },
      { headers: { "Content-Type": "multipart/form-data" } }
    ),
  delete: (id) => api.delete(`/anggota/${id}`)
};

// Portfolio
export const portfolioService = {
  getAll: (params) => api.get("/portfolio", { params }),
  getById: (id) => api.get(`/portfolio/${id}`),
  create: (data) =>
    api.post("/portfolio", data, {
      headers: { "Content-Type": "multipart/form-data" }
    }),
  update: (id, data) => api.put(`/portfolio/${id}`, data),
  delete: (id) => api.delete(`/portfolio/${id}`)
};

// Berita
export const beritaService = {
  getAll: (params) => api.get("/berita", { params }),
  getBySlug: (slug) => api.get(`/berita/${slug}`),
  create: (data) =>
    api.post("/berita", data, {
      headers: { "Content-Type": "multipart/form-data" }
    }),
  update: (id, data) => api.put(`/berita/${id}`, data),
  delete: (id) => api.delete(`/berita/${id}`)
};

// Prestasi
export const prestasiService = {
  getAll: () => api.get("/prestasi"),
  create: (data) => api.post("/prestasi", data),
  update: (id, data) => api.put(`/prestasi/${id}`, data),
  delete: (id) => api.delete(`/prestasi/${id}`)
};

// Settings
export const settingsService = {
  get: () => api.get("/settings"),
  update: (data) => api.put("/settings", data)
};

// Pendaftaran
export const pendaftaranService = {
  submit: (data) =>
    api.post("/pendaftaran", data, {
      headers: { "Content-Type": "multipart/form-data" }
    }),
  getAll: (params) => api.get("/pendaftaran", { params }),
  getById: (id) => api.get(`/pendaftaran/${id}`),
  updateStatus: (id, status) =>
    api.patch(`/pendaftaran/${id}/status`, { status }),
  delete: (id) => api.delete(`/pendaftaran/${id}`)
};

// Pesan Kontak
export const pesanService = {
  send: (data) => api.post("/pesan", data),
  getAll: () => api.get("/pesan-kontak"),
  markAsRead: (id) => api.patch(`/pesan-kontak/${id}/read`),
  delete: (id) => api.delete(`/pesan-kontak/${id}`)
};

export default api;
