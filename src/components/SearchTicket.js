import "../style.css";
import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import transition from "react-element-popper/animations/transition";
import vi_VN from "./vi_VN";
import Select from "react-select";
import carService from "../services/car.service";
import Search from "./Search";
import ResultTicket from "./ResultTicket";
import { province } from "../constants/Province";
import { Link, useHistory } from "react-router-dom";

function SearchTicket() {
  let history = useHistory();
  // const options = [
  //   { value: "Bình Định", label: "Bình Định" },
  //   { value: "Đăk Lăk", label: "Đăk Lăk" },
  //   { value: "Sài Gòn", label: "Sài Gòn" },
  //   { value: "Hà Nội", label: "Hà Nội" },
  // ];
  const options = province;
  const styleDatePicker = {
    width: "100%",
    height: "38px",
    borderRadius: "4px",
    fontSize: "14px",
    textAlign: "center",
  };
  const [start, setStart] = useState(options[12].value);
  const [destination, setDestination] = useState(options[0].value);
  const [submited, setSubmited] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(formatDate(new Date()));
  const handleDate = (e) => {
    setDate(e.target.value);
  }
  const handleChangeStart = (selectedOption) => {
    setStart(selectedOption.value);
  };
  const handleChangeDes = (selectedOption) => {
    setDestination(selectedOption.value);
  };
  console.log(start);
  console.log(destination);
  console.log(date);
  const handleSubmit = (e) => {
    e.preventDefault();
    // carService.search(start, destination, date)
    // .then((response) => {
    //   console.log(response.data);
    //   setData(response.data.data.cars);
    //   setSubmited(true);
      history.push(`/resultticket?start=${start}&destination=${destination}&date=${formatDate(date)}`);
    // })
    // .catch((e) => {
    //   console.log(e);
    // });
  }
  console.log(data);
  return (
    <div className="search">
      {
        submited ? (<ResultTicket data={data}/>) : (
          <div className="container">
            <div className="search-title">
              <h1 className="mb-5">Book now<br />Trang web đặt vé xe tiện lợi nhất Việt Nam</h1>
            </div>
            <form className="form-search" onSubmit={(e) => handleSubmit(e)}>
              <div className="row">
                <div className="col-md-3">
                  <div id="from" className="form-option">
                    <label htmlFor="">Điểm đi</label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={options[12]}
                      name="location"
                      options={options}
                      onChange={handleChangeStart}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-option">
                    <label>Điểm đến</label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={options[0]}
                      name="location"
                      options={options}
                      onChange={handleChangeDes}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-option">
                    <label>Thời gian</label>
                    <input
                      className="form-control"
                      name="date"
                      type="date"
                      min={formatDate(new Date())}
                      defaultValue={formatDate(new Date())}
                      onChange={(e) => {handleDate(e)}}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-option">
                    <label>&nbsp;</label>
                    <button type="submit" className="btn btn-block btn-primary btn-search">
                      Tìm chuyến
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )
      }
    </div>
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

export default SearchTicket;
