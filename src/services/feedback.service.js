import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const getFeedbacks = (id) => {
  return axios.get(API_URL + `feedbacks/${id}`, {
    headers: authHeader(),
  });
};

const create = (id, data) => {
  return axios.post(API_URL + `feedbacks/${id}`, data, {
    headers: authHeader(),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getFeedbacks,
  create,
};
