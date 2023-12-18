import axios from "axios";
// Alter defaults after instance has been created
const authAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
authAxios.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("task-app") !== undefined &&
      localStorage.getItem("task-app") !== null
        ? localStorage.getItem("task-app")
        : "";
    if (token) {
      config.headers["authorization"] = token;
    } else {
      delete axios.defaults.headers.common["authorization"];
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      localStorage.removeItem("task-app");
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default authAxios;
