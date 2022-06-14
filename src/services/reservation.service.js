import axios from "axios";
import authHeader from "../services/auth-service";

const API_URL = "http://localhost:8080/";

const getBooking = (id) => {
  return axios.get(API_URL + `reservations/user/${id}`, {
    headers: authHeader(),
  });
};

const create = (id, data) => {
  return axios.post(API_URL + `payments/${id}`, data, {
    headers: authHeader(),
  });
};

const createReservation = (id, data) => {
  return axios.post(API_URL + `reservations/${id}`, data, {
    headers: authHeader(),
  });
};

const updateStatus = (id) => {
  return axios.put(API_URL + `reservations/${id}`, {
    headers: authHeader(),
  });
};

const paypal = async (data) => {
  return await axios.post(API_URL + 'payments/createpaypal', data, {
    headers: authHeader(),
  });
}

const getPosition = (id, date) => {
  return axios.get(API_URL + `reservations/test/${id}?date=${date}`, {
    headers: authHeader(),
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create,
  paypal,
  getBooking,
  getPosition,
  updateStatus,
  createReservation,
};
