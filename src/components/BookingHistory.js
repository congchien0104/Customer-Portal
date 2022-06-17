import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import authService from "../services/auth.service";
import reservationService from "../services/reservation.service";
import { SuccessNotify } from "../utils/Notify";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BookingHistory(props) {

    const currentUser = authService.getCurrentUser();
    //console.log("user", currentUser.id);
    const id = currentUser.id;
    const [books, setBooks] = useState([]);
    const [result, setResult] = useState([]);
    const [open, setOpen] = useState(false);
    const getHistory = (id) => {
        reservationService.getBooking(id)
          .then((response) => {
            setBooks(response.data.data.result);
            setResult(response.data.data.reservation);
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

    const handleCancel = (id) => {
      reservationService.updateStatus(id)
        .then((response) => {
          console.log(response.data);
          
          getHistory(id);
          SuccessNotify("Huy ve thanh cong.");
        })
        .catch((e) => {
          console.log(e);
        });
    }

    const handleOpen =() => {
      setOpen(true);
    }
    
    return (
        <section className="car-line">
      <div className="container">
        <h1 className="heading-title bg-warning text-dark">Danh sách Lịch Sử Đặt Vé: </h1>
        <div class="tickets-list row" style={{ "height": "44rem", "overflow": "hidden", "overflowY": "scroll" }}>
        {
            (result || []).map((item, index) => (
              <div class="col-6 mt-0 mb-4">
                <div class="card">
                  <div class="card-body">
                    <figure style={{ "width": "20rem", "height": "10rem", "overflow": "hidden", "marginLeft": "auto", "marginRight": "auto" }}>
                      <img src={item.cars.image} style={{ "width": "100%", "height": "100%", "objectFit": "cover" }} alt="..." />
                    </figure>
                    <p className="card-title fs-4 text-center fw-bolder mb-2">Nhà xe {item?.cars?.name}</p>
                    <p className="card-text mb-2">Tuyến: {item?.cars?.lines[0].station} - {item?.cars?.lines[0].station_to}</p>
                    <p className="card-text mb-2">Ngày đi: {formatDate(item.reservation_date, 1)}</p>
                    <p className="card-text mb-2">Người đặt vé: {item.fullname || "Công Chiến"}</p>
                    <p className="card-text mb-2">Mã vé: {item?.receipt_number}</p>
                    <p className="card-text mb-2">Số điện thoại: {item.phone}</p>
                    <p className="card-text mb-2">Trạng thái: {item.status || 'Hoạt động'}</p>
                    <p className="card-text mb-2">Tổng Tiền: {moneyFormatter(item.amount)}</p>
                    <div>
                      <button className="btn btn-danger" onClick={ () => handleCancel(item.id)}>Hủy</button>
                    </div>
                  </div>
                  <div className="card-footer">
                    <p className="card-text"><small className="text-muted">Đã đặt {formatDate(item.createdAt)}</small></p>
                  </div>
                </div>
              </div>
            ))
          }
          {
            books.map((item, index) => (
              <div class="col-6 mt-0 mb-4">
                <div class="card">
                  <div class="card-body">
                    <figure style={{ "width": "20rem", "height": "10rem", "overflow": "hidden", "marginLeft": "auto", "marginRight": "auto" }}>
                      <img src={item.cars.image} style={{ "width": "100%", "height": "100%", "objectFit": "cover" }} alt="..." />
                    </figure>
                    <p className="card-title fs-4 text-center fw-bolder mb-2">Nhà xe {item.cars.name}</p>
                    <p className="card-text mb-2">Tuyến: {item?.cars?.lines[0].station} - {item?.cars?.lines[0].station_to}</p>
                    <p className="card-text mb-2">Ngày đi: {formatDate(item.reservation_date, 1)}</p>
                    <p className="card-text mb-2">Người đặt vé: {item.fullname}</p>
                    <p className="card-text mb-2">Số điện thoại: {item.phone}</p>
                    <p className="card-text mb-2">Trạng thái: {item.status || 'Hoàn thành'}</p>
                    <p className="card-text mb-2">Tổng Tiền: {moneyFormatter(item.amount)}</p>
                    <div>
                      <Link to={`/carlist/${item?.carId}`} className="btn btn-success">
                        Đánh Giá
                      </Link>
                    </div>
                    <div>
                      <Button onClick={handleOpen}>Xem chi tiết</Button>
                      <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography id="modal-modal-title" variant="h6" component="h2">
                          Xe: {item.cars.name}
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Tuyến: {item?.cars?.lines[0].station} - {item?.cars?.lines[0].station_to}
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Ngày đi: {formatDate(item.reservation_date, 1)}
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Thời gian: {item?.cars?.lines[0].departure_time} - {item?.cars?.lines[0].arrival_time}
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Biển số: { item.cars.plate_number}
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Mã vé: { item?.receipt_number}
                          </Typography>
                        </Box>
                      </Modal>
                    </div>
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