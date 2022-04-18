import React, { useState, useEffect } from "react";

import CarService from "../services/car.service";

function Booking(props) {
  const [car, setCar] = useState({
    id: 1,
    name: "Quang Minh",
    capacity: 24,
    station: "BX Miền Đông",
    start: "Sài Gòn",
    end: "Hà Nội",
    time_start: "14:00",
    time_end: "5:00"
  }
  );
  const getCar = (id) => {
    CarService.getCar(id)
      .then((response) => {
        setCar(response.data.data.car);
        console.log(response.data.data.car);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCar(props.match.params.id);
    console.log(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <div className="booking-ticket">
      <div className="container">
        <h1 className="heading-title">Thông tin đặt vé</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src="https://static.vexere.com/production/images/1589432483289.jpeg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Nhà xe {car.name}</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item pr-0 pl-0">
                    <div className="row justify-content-between">
                      <div className="col-auto">Tuyến xe đi từ:</div>
                      <div className="col-auto text-primary font-weight-bold">{car.start}</div>
                    </div>
                  </li>
                  <li class="list-group-item pr-0 pl-0">
                    <div className="row justify-content-between">
                      <div className="col-auto">Tuyến xe dừng tại:</div>
                      <div className="col-auto text-primary font-weight-bold">{car.end}</div>
                    </div>
                  </li>
                  <li class="list-group-item pr-0 pl-0">
                    <div className="row justify-content-between">
                      <div className="col-auto">Thời gian khởi hành:</div>
                      <div className="col-auto text-primary font-weight-bold">{car.time_start}</div>
                    </div>
                  </li>
                  <li class="list-group-item pr-0 pl-0">
                    <div className="row justify-content-between">
                      <div className="col-auto">Thời gian đến:</div>
                      <div className="col-auto text-primary font-weight-bold">{car.time_end}</div>
                    </div>
                  </li>
                  <li class="list-group-item pr-0 pl-0">
                    <div className="row justify-content-between">
                      <div className="col-auto">Giá tiền:</div>
                      <div className="col-auto text-primary font-weight-bold"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <form>
              <div class="form-group row">
                <label for="name" class="col-sm-4 col-form-label">
                  Họ tên
                </label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="name" />
                </div>
              </div>
              <div class="form-group row">
                <label for="phone" class="col-sm-4 col-form-label">
                  Số điện thoại
                </label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="phone" />
                </div>
              </div>
              <div class="form-group row">
                <label for="email" class="col-sm-4 col-form-label">
                  Email
                </label>
                <div class="col-sm-8">
                  <input type="email" class="form-control" id="email" />
                </div>
              </div>
              <div class="form-group row">
                <label for="seat" class="col-sm-4 col-form-label">
                  Số ghế
                </label>
                <div class="col-sm-8">
                  <input type="number" class="form-control" id="seat" />
                </div>
              </div>
              <div class="form-group row">
                <label for="payment" class="col-sm-4 col-form-label">
                  Thanh toán:
                </label>
                <div class="col-sm-8">
                  <input type="text" class="form-control" id="payment" />
                </div>
              </div>
              <div className="row">
                <label for="payment" class="col-sm-4 col-form-label">
                  Hình thức thanh toán:
                </label>
                <div class="col-sm-8">
                  <button className="btn btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-paypal"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.351.351 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91.379-.27.712-.603.993-1.005a4.942 4.942 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.687 2.687 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.695.695 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016c.217.124.4.27.548.438.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.873.873 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.352.352 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32.845-5.214Z" />
                    </svg>{" "}
                    Paypal
                  </button>
                </div>
              </div>
              <button class="btn btn-primary" type="submit">
                Mua vé
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;