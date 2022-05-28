import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import reservationService from "../services/reservation.service";

function BookingHistory(props) {
    //const { id } = useParams();
    const id = 14;
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
        <div class="row g-4">
          {
            books.map((item, index) => (
              <div className="col-6" key={index}>
                <div className="card">
                  <img src={item.cars.image} className="card-img-top" alt="..."></img>
                  <div className="card-body">
                    <h5 className="card-title">Nhà xe {item.cars.name}</h5>
                    <p className="card-text">Người đặt vé: {item.phone}</p>
                    <p className="card-text">Số điện thoại: {item.fullname}</p>
                    <p className="card-text">Hành Trình: {item.cars.station} - {item.cars.station_to}</p>
                    <p className="card-text">Ngày đi: {formatDate(item.reservation_date, 1)}</p>
                    <p className="card-text">Tổng Tiền: {moneyFormatter(item.amount)}</p>
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