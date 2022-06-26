import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import CarService from "../services/car.service";
import Pagination from "react-responsive-pagination";

function CarList(props) {
  const [cars, setCars] = useState([]);
  const [count, setCount] = useState();
  const [totalPages, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
  }
  useEffect(() => {
    retrieveCars();
    console.log(cars);
  }, [currentPage]);

  const retrieveCars = () => {
    CarService.getCarList(currentPage)
      .then((response) => {
        //setCategories(response.data);
        setCars(response.data.data.cars.rows);
        setCount(response.data.data.cars.count);
        console.log(response.data.data.cars);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="car-list">
      <div className="container">
        <h1 className="heading-title">Danh sách nhà xe</h1>
        <div className="page-body">
          <div className="row">
            {cars.map((car, index) => (
              <div key={index} className="col-lg-3 col-md-4 mb-5">
                <div className="card">
                  <div className="carlist-img">
                    <img
                      className="card-img-top"
                      src={car.image}
                      alt={car.name}
                    />
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                      <h2 className="car-name">{car?.name}</h2>
                      <p1>Biển Số: {car.plate_number}</p1><br/>
                    </div>
                  </div>
                  <div className="card-footer pb-4 border-top-0 bg-transparent">
                    <div className="text-center">
                      {/* <Link to={`/booking/${car.id}`} className="btn btn-primary mr-2">
                        Đặt ngay
                      </Link> */}
                      <Link to={`/carlist/${car.id}`} className="btn btn-success">
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>        
        </div>
        <Pagination 
        total={Math.ceil(count/8)}
        current={currentPage}
        onPageChange={page => handlePageChange(page)}
         />
      </div>  
    </div>
  );
}

export default CarList;
