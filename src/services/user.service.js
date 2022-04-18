import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const changePassword = (data) => {
  return axios.post(API_URL + "user/changepassword", data, {
    headers: authHeader(),
  });
};

const update = (data) => {
  return axios.post(API_URL + "user/update", data, {
    headers: authHeader(),
  });
};

const getUser = () => {
  return axios.get(API_URL + "user/me", {
    headers: authHeader(),
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  changePassword,
  update,
  getUser
};
