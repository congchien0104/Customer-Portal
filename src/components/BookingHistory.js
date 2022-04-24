import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import reservationService from "../services/reservation.service";

function BookingHistory(props) {
    const { id } = useParams();
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
        {/* {books.map((item, index) => (
          <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src={item.cars.image}
                  class="card-img"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    Nhà Xe: {item.cars.name}
                  </h5>
                  <p class="card-text">
                    Hành Trình: {item.cars.station} - {item.cars.station_to}
                  </p>
                  <p class="card-text">
                    Mã Vé: {item.receipt_number}
                  </p>
                  <p class="card-text">
                    Số lượng: {item.quantity}
                  </p>
                  <p class="card-text">
                    Tổng Tiền: {item.amount}
                  </p>
                  <p class="card-text">
                    Họ và Tên: {item.fullname}
                  </p>
                  <p class="card-text">
                    Số Điện Thoại: {item.phone}
                  </p>
                  <p class="card-text">
                    Ngày Đặt Vé: {formatDate(item.createdAt)}
                  </p>
                  <p class="card-text">
                    Ngày Đi Xe: {formatDate(item.reservation_date)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))} */}
        <div class="row row-cols-1 row-cols-md-2 g-4">
          {
            books.map((item, index) => (
              <div class="col">
                <div class="card">
                  <img src="..." class="card-img-top" alt="..."/>
                  <div class="card-body">
                    <h5 class="card-title">{item.cars.name}</h5>
                    <p class="card-text">Tổng Tiền: {moneyFormatter(item.amount)}</p>
                    <p class="card-text">Hành Trình: {item.cars.station} - {item.cars.station_to}</p>
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

export default BookingHistory;