import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const getCarList = (page) => {
  return axios.get(API_URL + `cars?page=${page}`, {
    headers: authHeader(),
  });
};

const getCar = (id) => {
  return axios.get(API_URL + `cars/${id}`, {
    headers: authHeader(),
  });
};

const getCarSeat = (id) => {
  return axios.get(API_URL + `cars/carseats/${id}`, {
    headers: authHeader(),
  });
};

const getDetailCar = (id) => {
  return axios.get(API_URL + `schedules/car/${id}`, {
    headers: authHeader(),
  });
};
const search = (start, des, date, order, minprice, maxprice) => {
  console.log('service', order);
  return axios.get(API_URL + `cars/car/search?start=${start}&destination=${des}&date=${date}&order=${order}&minprice=${minprice}&maxprice=${maxprice}`, {
    headers: authHeader(),
  });
};
const searchFilter = (start, des, date, price) => {
  return axios.get(API_URL + `cars/car/search?start=${start}&destination=${des}&date=${date}&price=${price}`, {
    headers: authHeader(),
  });
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCarList,
  getCar,
  getDetailCar,
  search,
  searchFilter,
  getCarSeat
};
