import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Search(props) {
    const { data } = props;
    console.log("search", data);
  return (
    <section className="car-line">
      <div className="container">
        <h1 className="heading-title">Danh sách tuyến xe</h1>
        {data.map((item, index) => (
          <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src={item.lines.image}
                  class="card-img"
                  alt={item.lines.name}
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    Nhà Xe {item.lines.name}
                  </h5>
                  <p class="card-text">
                    Xuất Phát: {item.lines.station} - {item.lines.station_to}
                  </p>
                  <p class="card-text">
                    Thời gian: {item.departure_time} - {item.arrival_time}
                  </p>
                  <Link to={`lines/${item.lines.id}`}>
                    <button className="btn btn-primary">Xem Chi Tiết</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Search;
