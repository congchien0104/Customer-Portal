import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useLocation, useHistory } from "react-router-dom";
import queryString from "query-string";
import carService from "../services/car.service";

function ResultTicket() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const start = urlParams.get("start");
  const destination = urlParams.get("destination");
  const date = urlParams.get("date");

  const [cars, setCars] = useState([]);
  // const [price, setPrice] = useState(100000);
  // const result = (start, destination,date, price) => {
  //   carService
  //     .searchFilter(start, destination, date, price)
  //     .then((response) => {
  //       //console.log(response.data);
  //       setCars(response.data.data.cars);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  const result = (start, destination,date) => {
    carService
      .search(start, destination, date)
      .then((response) => {
        console.log(response.data);
        setCars(response.data.data.cars);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    result(start, destination,date);
  }, []);

  return (
    <div className="result-ticket pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <p className="fs-5 fw-bolder badge bg-primary">Bộ lọc tìm kiếm</p>
            <div class="list-group">
              <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Giờ đi</h5>
                </div>
              </div>
              <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Giá vé</h5>
                </div>
              </div>
              <div class="list-group-item">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Số ghế trống</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="result-top d-flex align-items-center justify-content-between">
              <p className="fs-5 fw-bolder mb-0">
                Đã tìm được:{" "}
                <span className="badge rounded-pill bg-success">{cars.length} chuyến</span>
              </p>
              <select
                class="form-select select-filter"
                aria-label="Default select example"
              >
                <option selected>Sắp xếp theo</option>
                <option value="1">Khởi hành sớm nhất</option>
                <option value="2">Khởi hành muộn nhất</option>
                <option value="3">Giá từ cao đến thấp</option>
                <option value="4">Giá từ thấp đến cao</option>
              </select>
            </div>

            {cars &&
              cars.map((car, index) => (
                <div class="card mb-3">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img
                        src={car.lines.image}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <div class="d-flex align-items-center justify-content-between">
                          <h5 class="card-title">Nhà Xe {car.lines.name}</h5>
                          <span class="badge rounded-pill bg-info text-dark">
                            {car.lines.price}
                          </span>
                        </div>
                        <p class="card-text">
                          <small class="text-muted">
                            Limousine {car.lines.capacity} giường
                          </small>
                        </p>
                        <div class="from-to d-flex justify-content-start">
                          <svg
                            class="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 eKNjJr"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="74"
                            viewBox="0 0 14 74"
                          >
                            <path
                              fill="none"
                              stroke="#787878"
                              stroke-linecap="round"
                              stroke-width="2"
                              stroke-dasharray="0 7"
                              d="M7 13.5v46"
                            ></path>
                            <g fill="none" stroke="#484848" stroke-width="3">
                              <circle
                                cx="7"
                                cy="7"
                                r="7"
                                stroke="none"
                              ></circle>
                              <circle cx="7" cy="7" r="5.5"></circle>
                            </g>
                            <path
                              d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
                              fill="#787878"
                            ></path>
                          </svg>
                          <div class="from-to-content">
                            <div class="content from d-flex">
                              <div class="hour">{car.departure_time}</div>
                              <div class="place">• {car.lines.station}</div>
                            </div>
                            <div class="duration">12h25m</div>
                            <div class="content to d-flex">
                              <div class="hour">{car.arrival_time}</div>
                              <div class="place">• {car.lines.station_to}</div>
                            </div>
                          </div>
                          <div class="button-book">
                              <Link to={`ticketbooking/${car.lines.id}?date=${date}`}>
                                <button className="btn btn-primary">Đặt ngay</button>
                              </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ResultTicket;
