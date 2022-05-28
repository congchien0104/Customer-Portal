import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import authService from "../services/auth.service";
import reservationService from "../services/reservation.service";

function BookingHistory(props) {

    const currentUser = authService.getCurrentUser();
    //console.log("user", currentUser.id);
    const id = currentUser.id;
    const [books, setBooks] = useState([]);
    const getHistory = (id) => {
        reservationService.getBooking(id)
          .then((response) => {
            setBooks(response.data.data.reservation);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
    };
    useEffect(() => {
        getHistory(id);
      }, [id]);

    console.log(books);
    
    return (
        <section className="car-line">
      <div className="container">
        <h1 className="heading-title bg-warning text-dark">Danh sách Lịch Sử Đặt Vé: </h1>
        <div class="tickets-list row" style={{ "height": "44rem", "overflow": "hidden", "overflowY": "scroll" }}>
          {
            books.map((item, index) => (
              <div class="col-6 mt-0 mb-4">
                <div class="card">
                  <div class="card-body">
                    <figure style={{ "width": "20rem", "height": "10rem", "overflow": "hidden", "marginLeft": "auto", "marginRight": "auto" }}>
                      <img src={item.cars.image} style={{ "width": "100%", "height": "100%", "objectFit": "cover" }} alt="..." />
                    </figure>
                    <p className="card-title fs-4 text-center fw-bolder mb-2">Nhà xe {item.cars.name}</p>
                    <p className="card-text mb-2">Tuyến: {item.cars.station} - {item.cars.station_to}</p>
                    <p className="card-text mb-2">Ngày đi: {formatDate(item.reservation_date, 1)}</p>
                    <p className="card-text mb-2">Người đặt vé: {item.fullname}</p>
                    <p className="card-text mb-2">Số điện thoại: {item.phone}</p>
                    <p className="card-text mb-2">Tổng Tiền: {moneyFormatter(item.amount)}</p>
                  </div>
                  <div className="card-footer">
                    <p className="card-text"><small className="text-muted">Đã đặt {formatDate(item.createdAt)}</small></p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
    );
}

const formatDate = (date, option=0) => {
  var d = new Date(date),
    minute = ""+ (d.getMinutes() + 1),
    hours = "" + (d.getHours() + 1),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return option === 1 ? [day, month, year].join("-") : [hours, minute].join(":") + " ngày " + [day, month, year].join("-");
};

const moneyFormatter = (money) => {
  if (!money) money = 0;
  const result = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
  }).format(money);
  return result;
};

export default BookingHistory;