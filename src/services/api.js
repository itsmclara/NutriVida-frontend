import axios from "axios";

const api = axios.create({
  baseURL: "/api"
});

api.interceptors.request.use((config) => {

  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["ngrok-skip-browser-warning"] = "true";
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/"
    ) {

      window.mostrarToast?.(
        "Você precisa fazer login novamente.",
        "aviso"
      );

      sessionStorage.removeItem("token");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }

    return Promise.reject(error);
  }
);

export default api;