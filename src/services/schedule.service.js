import axios from "axios";

const API_URL = "http://localhost:8080/";

const getLines = () => {
  return axios.get(API_URL + "lines");
};

const getRoutesOfCar = (id) => {
  return axios.get(API_URL + `schedules/route/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getLines,
  getRoutesOfCar
};
