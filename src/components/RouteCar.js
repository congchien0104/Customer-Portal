import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import CarService from "../services/car.service";
import Pagination from "react-responsive-pagination";
import scheduleService from "../services/schedule.service";

function RouteCar() {
    const { id } = useParams();
    const [cars, setCars] = useState([]);
    useEffect(() => {
        scheduleService.getRoutesOfCar(id)
        .then((response) => {
            setCars(response.data.data.route.lines);
            //setCount(response.data.data.cars.count);
            console.log(response.data.data.route.lines);
          })
          .catch((e) => {
            console.log(e);
          });
      }, []);
  return (
    <div className="car-list">
      <div className="container">
        <h1 className="heading-title">Danh sách tuyến xe cần tìm</h1>
        <div className="page-body">
          <div className="row">
            {cars.map((car, index) => (
              <div key={index} className="col-lg-3 col-md-4 mb-5">
                <div className="card">
                  <img
                    className="card-img-top"
                    src={car.schedules.image}
                    alt={car.schedules.name}
                  />
                  <div className="card-body">
                    <div className="text-center">
                      <h2 className="car-name">{car.schedules.name}</h2>
                      <p1>Số lượng ghế: {car.schedules.capacity}</p1>
                      <br />
                      <p1>Bến Xe: {car.schedules.station}</p1>
                      <br />
                      <p1>Giá: {car.schedules.price} VND</p1>
                    </div>
                  </div>
                  <div className="card-footer pb-4 border-top-0 bg-transparent">
                    <div className="text-center">
                      <Link
                        to={`/booking/${car.schedules.id}`}
                        className="btn btn-primary mr-2"
                      >
                        Đặt ngay
                      </Link>
                      <Link
                        to={`/carlist/${car.schedules.id}`}
                        className="btn btn-success"
                      >
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <Pagination
          total={Math.ceil(count / 8)}
          current={currentPage}
          onPageChange={(page) => handlePageChange(page)}
        /> */}
      </div>
    </div>
  );
}

export default RouteCar;
