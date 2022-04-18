import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const verifyUser = (code) => {
  return axios.get(API_URL + "confirm/" + code).then((response) => {
    return response.data;
  });
};

const forgot = (data) => {
  return axios.post(API_URL + "forgot", data);
};

const reset = (code, data) => {
  return axios.post(API_URL + `reset/${code}`, data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  register,
  login,
  logout,
  getCurrentUser,
  verifyUser,
  forgot,
  reset
};
