import { toast } from "react-toastify";
import authAxios from "../../utils/authAxios";
import axios from "axios";

export const signUp = (data, callBack) => {
  axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER_URL}/account`,
    data: data,
  })
    .then((response) => {
      toast.success(response?.data?.message || "Account created successfully");
      localStorage.setItem("task-app", response?.data?.data);
      callBack(response?.data?.data);
    })
    .catch((error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong!"
      );
    });
};

export const login = (data, callBack) => {
  axios({
    method: "POST",
    url: `${process.env.REACT_APP_SERVER_URL}/account/login`,
    data: data,
  })
    .then((response) => {
      toast.success(response?.data?.message || "Login successfully");
      localStorage.setItem("task-app", response?.data?.data);
      callBack(response?.data?.data);
    })
    .catch((error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong!"
      );
    });
};

export const getUser = (id, callBack) => {
  authAxios({
    method: "GET",
    url: `account/${id}`,
  })
    .then((response) => {
      callBack(response?.data?.data);
    })
    .catch((error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong!"
      );
    });
};

export const updateUser = (data, callBack) => {
  authAxios({
    method: "PUT",
    url: `account/`,
    data: data,
  })
    .then((response) => {
      toast.success(response?.data?.message || "Profile update successfully");
      callBack(response?.data?.data);
    })
    .catch((error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong!"
      );
    });
};

export const getTasks = (filters) => {
  return authAxios.get("/task", { params: filters });
};

export const saveTask = (data, callBack) => {
  authAxios({
    method: "POST",
    url: `/task`,
    data: data,
  })
    .then((response) => {
      toast.success(response?.data?.message || "Task created successfully");
      callBack();
    })
    .catch((error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong!"
      );
    });
};

export const updateTask = (data, callBack) => {
  authAxios({
    method: "PUT",
    url: `/task`,
    data: data,
  })
    .then((response) => {
      toast.success(response?.data?.message || "Task created successfully");
      callBack();
    })
    .catch((error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong!"
      );
    });
};

export const deleteTask = (id, callBack) => {
  authAxios({
    method: "DELETE",
    url: `/task/${id}`,
  })
    .then((response) => {
      toast.success(response?.data?.message || "Task deleted successfully");
      callBack();
    })
    .catch((error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "something went wrong!"
      );
    });
};
