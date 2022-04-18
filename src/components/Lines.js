import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LineService from "../services/schedule.service";

function Lines(props) {
  let history = useHistory();
  const [lines, setLines] = useState([]);
  useEffect(() => {
    retrieveLines();
    console.log(lines);
  }, []);

  const retrieveLines = () => {
    LineService.getLines()
      .then((response) => {
        //setCategories(response.data);
        setLines(response.data.data.lines);
        console.log(response.data.data.lines);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <section className="car-line">
      <div className="container">
        <h1 className="heading-title">Danh sách tuyến xe</h1>
        {lines.map((line, index) => (
          <div class="card mb-3">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img
                  src="https://static.vexere.com/production/images/1589432483289.jpeg"
                  class="card-img"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    Tuyến: {line.start} - {line.destination}
                  </h5>
                  <p class="card-text">
                    Thời gian: {line.departure_time} - {line.arrival_time}
                  </p>
                  <button className="btn btn-primary" onClick={() => history.push(`/resultticket?start=${line.start}&destination=${line.destination}&date=${formatDate(new Date())}`)}>Xem Chi Tiết</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    // <div className="container">
    //   {lines.map((line, index) => (
    //     <div class="card mb-3">
    //       <div class="row no-gutters">
    //         <div class="col-md-4">
    //           <img
    //             src="https://static.vexere.com/production/images/1589432483289.jpeg"
    //             class="card-img"
    //             alt="..."
    //           />
    //         </div>
    //         <div class="col-md-8">
    //           <div class="card-body">
    //             <h5 class="card-title">
    //               Tuyến: {line.starting_point} - {line.destination}
    //             </h5>
    //             <p class="card-text">Nhà xe Thiện Chiến</p>
    //             <p class="card-text">
    //               Thời gian: {line.departture_time} - {line.arrival_time}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
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

export default Lines;
