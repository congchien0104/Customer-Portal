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
        <React.Fragment>
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
        </React.Fragment>
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