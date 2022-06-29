import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const create = (data) => {
  return axios.post(API_URL + "companies", data, {
    headers: authHeader(),
  });
};

const getCompanyDetails = (id) => {
  return axios.get(API_URL + `companies/details/${id}`, {
    headers: authHeader(),
  });
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
  getCompanyDetails
};