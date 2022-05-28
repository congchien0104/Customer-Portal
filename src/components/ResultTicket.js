import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import carService from "../services/car.service";
import Select from "react-select";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { province } from "../constants/Province";
import ReactStars from "react-rating-stars-component";

function ResultTicket() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const starts = urlParams.get("start");
  const destinations = urlParams.get("destination");
  const dates = urlParams.get("date");


  console.log("start", starts);
  console.log("des", destinations);
  console.log(starts);


  const provinces = province;
  
  const [start, setStart] = useState(starts);
  const [destination, setDestination] = useState(destinations);
  const [date, setDate] = useState(formatDate(dates));
  const handleDate = (e) => {
    setDate(e.target.value);
  }
  const handleChangeStart = (selectedOption) => {
    setStart(selectedOption.value);
  };
  const handleChangeDes = (selectedOption) => {
    setDestination(selectedOption.value);
  };

  const [cars, setCars] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [order, setOrder] = useState(0);
  const [filter, setFilter] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000000);
  //const [selected, setSelected] = useState([]);

  const result = (start, destination, date, order, minPrice, maxPrice) => {
    carService
      .search(start, destination, date, order, minPrice, maxPrice)
      .then((response) => {
        console.log(response.data.data.cars);
        setCars(response.data.data.cars);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    result(start, destination, date, order, minPrice, maxPrice);
  }, [start, destination, date, order, minPrice, maxPrice]);

  const handleOrder = (e) => {
    //console.log(e.target.value);
    setOrder(e.target.value);
  }

  const handleFilter = (e) => {
    console.log("temp filter: ",e.target.value);
    setFilter(e.target.value);
  }

  // useEffect(() => {
  //   const carFilter = cars.filter((car) => car.type === filter);
  //   setCars(carFilter);
  // }, [filter]);

  const handleChangeMinPrice = (e) => {
    //console.log(e.target.value);
    setMinPrice(e.target.value);
  };

  const handleChangeMaxPrice = (e) => {
    //console.log(e.target.value);
    setMaxPrice(e.target.value);
  };

  

  return (
    <div className="result-ticket pb-5" style={{ "minHeight": "calc(100vh - 404px)" }}>
      <div className="container">
        <div className="search mb-4 mt-4">
          <form className="form-search">
            <div className="row pr-2 pl-2">
              <div className="col-md-3 p-0">
                <div id="from" className="form-option p-0 m-1">
                  <label className="text-primary fs-5 fw-bolder mt-0 mb-2">Điểm đi</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    //defaultValue={starts}
                    value={{value: start, label: start}}
                    name="start"
                    options={provinces}
                    onChange={handleChangeStart}
                  />
                </div>
              </div>
              <div className="col-md-3 p-0">
                <div className="form-option p-0 m-1">
                  <label className="text-primary fs-5 fw-bolder mt-0 mb-2">Điểm đến</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    //defaultValue={destinations}
                    value={{value: destination, label: destination}}
                    name="destination"
                    options={provinces}
                    onChange={handleChangeDes}
                  />
                </div>
              </div>
              <div className="col-md-3 p-0">
                <div className="form-option p-0 m-1">
                  <label className="text-primary fs-5 fw-bolder mt-0 mb-2">Thời gian</label>
                  <input
                    className="form-control"
                    name="date"
                    type="date"
                    min={formatDate(new Date())}
                    defaultValue={date}
                    onChange={(e) => {handleDate(e)}}
                  />
                </div>
              </div>
              <div className="col-md-3 p-0">
                <div className="form-option p-0 m-1">
                  <label className="text-primary fs-5 fw-bolder mt-0 mb-2">&nbsp;</label>
                  <button type="submit" className="btn btn-block btn-primary btn-search fw-bolder">
                    Tìm chuyến
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
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
                  <div className="row">
                  <div data-role="range">
                      <label>
                          Giá thấp nhất: {moneyFormatter(minPrice || 0)}
                      </label>
                      <input
                          type="range"
                          className="form-range"
                          min="0"
                          max="500000"
                          step="1000"
                          onChange={handleChangeMinPrice}
                      />
                  </div>
                  <div data-role="range">
                      <label>
                          Giá cao nhất: {moneyFormatter(maxPrice || 0)}
                      </label>
                      <input
                          type="range"
                          className="form-range"
                          min="0"
                          max="2000000"
                          step="1000"
                          onChange={handleChangeMaxPrice}
                      />
                  </div>
            </div>
                </div>
              </div>
              <div class="list-group-item">
                <div>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Loại xe</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="All"
                      name="radio-buttons-group"
                      onChange={handleFilter}
                    >
                      <FormControlLabel value="All" control={<Radio />} label="All" />
                      <FormControlLabel value="Limousine" control={<Radio />} label="Limousine" />
                      <FormControlLabel value="36 Giường thường" control={<Radio />} label="36 Giường thường" />
                      <FormControlLabel value="24 Giường thường" control={<Radio />} label="24 Giường thường" />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row result-top mb-2">
              <div className="col-8 p-0">
                <p className="fs-5 fw-bolder mb-0">
                  Đã tìm được:{" "}
                  <span className="badge rounded-pill bg-success">{cars.filter((car) =>
                filter === "All" ? true : car.type === filter
              ).length} chuyến</span>
                </p>
              </div>
              <div className="col-4 p-0">
                <select
                  class="form-select select-filter"
                  aria-label="Default select example"
                  onChange={handleOrder}
                >
                  <option selected>Sắp xếp theo</option>
                  <option value="0">Khởi hành sớm nhất</option>
                  <option value="1">Khởi hành muộn nhất</option>
                  <option value="2">Giá từ cao đến thấp</option>
                  <option value="3">Giá từ thấp đến cao</option>
                </select>
              </div>
            </div>

            {cars &&
              cars.filter((car) =>
                filter === "All" ? true : car.type === filter
              ).map((car, index) => (
                <div class="card mb-3">
                  <div class="row g-0">
                    <div class="col-md-4">
                      <img
                        src={car.image}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body h-100 position-relative">
                        <div class="d-flex align-items-center justify-content-between">
                          <h5 class="card-title">Nhà Xe {car.name}</h5>
                          <span class="badge rounded-pill bg-info text-dark">
                            {moneyFormatter(car.price)}
                          </span>
                        </div>
                        <p class="card-text">
                          <small class="text-muted">
                            Limousine {car.type}
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
                              <div class="hour">{car.lines.departure_time}</div>
                              <div class="place">• Bến xe {car.station}</div>
                            </div>
                            <div class="duration">12h25m</div>
                            <div class="content to d-flex">
                              <div class="hour">{car.lines.arrival_time}</div>
                              <div class="place">• Bến xe {car.station_to}</div>
                            </div>
                          </div>
                          <div class="button-book position-absolute bottom-1 end-0 d-flex">
                              <p className="mr-2">
                                <a class="btn btn-primary" data-bs-toggle="collapse" href={`#${index}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                                  Xem đánh giá
                                </a>
                              </p>
                              <Link to={`ticketbooking/${car.lines.id}?date=${date}`}>
                                <button className="btn btn-primary">Đặt ngay</button>
                              </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="" id={index}>
                    <div>
                      <div className="car-feedbacks">
                        <div className="card">
                          <div class="card-header">Danh sách đánh giá</div>
                          <div className="card-body" style={{ "maxHeight": "400px", "overflow":"hidden" , "overflowY": "scroll"}}>
                            <div className="list-group list-group-flush">
                              {car?.feedbacks ? (
                                car?.feedbacks.map((feedback, index) => (
                                  <a key={index} href="/" className="list-group-item list-group-item-action flex-column align-items-start">
                                    <p className="feedback-username">{feedback.feedbacks.username || "Cong Chien"}</p>
                                    <ReactStars
                                      count={5}
                                      value={feedback.rating}
                                      size={18}
                                      activeColor="#fb6e2e"
                                    />
                                    <p className="feedback-content">{feedback.content}</p>
                                    <small className="feedback-time text-muted">{formatDate(feedback.createdAt)}</small>
                                  </a>
                                ))
                              ) : (
                                <div> Chưa có đánh giá.</div>
                              )}
                            </div>
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

const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

const moneyFormatter = (money) => {
  if (!money) money = 0;
  const result = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
  }).format(money);
  return result;
};

export default ResultTicket;
