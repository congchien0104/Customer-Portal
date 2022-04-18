import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useHistory } from "react-router-dom";
import CarService from "../services/car.service";
import FeedbackService from "../services/feedback.service";
import AuthService from "../services/auth.service";
import { SuccessNotify } from "../utils/Notify";

function CarDetails(props) {
  let history = useHistory();
  const [car, setCar] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [feedback, setFeedback] = useState("");
  const [star, setStar] = useState(1);
  const [lines, setLines] = useState([]);

  const getCar = (id) => {
    CarService.getCar(id)
      .then((response) => {
        setCar(response.data.data.car);
        setLines(response.data.data.car.lines)
        console.log(car);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(lines);

  const getFeedbacks = (id) => {
    FeedbackService.getFeedbacks(id)
      .then((response) => {
        setFeedbacks(response.data.data.feedback.feedbacks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCar(props.match.params.id);
    getFeedbacks(props.match.params.id);
  }, [props.match.params.id]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);
  const ratingChanged = (newRating) => {
    setStar(newRating);
  };
  const handleInputChange = (e) => {
    const content = e.target.value;
    setFeedback(content);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = props.match.params.id;
    const data = {
      content: feedback,
      rating: star,
    };
    console.log(data);
    FeedbackService.create(id, data)
      .then((response) => {
        setStar(1);
        SuccessNotify("Đánh giá thành công");
        getFeedbacks(props.match.params.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="car-details">
      <div className="container">
        <h1 className="heading-title">Nhà xe {car.name}</h1>
        <div className="car-desc mb-4">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <img
                  className="card-img-top"
                  src={car.image}
                  alt={car.name} />
                <div className="card-body">
                  <div className="row justify-content-between">
                    <div className="col-auto">
                      <h2 className="card-title">Nhà xe {car.name}</h2>
                      <p className="card-title">{car.station}</p><br/>
                      <p className="card-title">{car.price} VND</p><br/>
                      <ReactStars
                        count={5}
                        value={4}
                        size={24}
                        activeColor="#fb6e2e"
                      />
                    </div>
                    <div className="col-auto">
                      {/* <Link to={`/booking/${car.id}`} className="btn btn-primary">
                        Đặt ngay
                      </Link> */}
                      <Link to={`ticketbooking/${car.id}`} className="btn btn-warning">
                        Chọn Tuyến
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2>Thông tin chi tiết về nhà xe</h2>
              
              {
                lines && lines.map((item, index) => (
                  <ul className="info-car-list p-0">
                    <li className="info-car-item d-flex">
                      <p className="info-title">Hành Trình:</p>
                      <div className="info-content">{item.start}  -  {item.destination}</div>
                    </li>
                    <li className="info-car-item d-flex">
                      <p className="info-title">Thời gian:</p>
                      <div className="info-content">{item.departure_time}  -  {item.arrival_time}</div>
                    </li>
                    <li className="info-car-item d-flex">
                      <p className="info-title">Các Thứ Trong Tuần:</p>
                      <div className="info-content">{item.weekdays}</div>
                    </li>
                    <li className="info-car-item d-flex">
                      <button className="btn btn-warning" onClick={()=> history.push(`/ticketbooking/${car.id}?date=2021-12-28`)}>
                        Chọn Tuyến
                      </button>
                    </li>
                  </ul>
                ))
              }
              <p>Số Ghế: {car.capacity}</p><br/>
              <p>Giá Vé: {car.price}</p><br/>
              <p>Biển Số: {car.plate_number}</p><br/>
              <p>Bến Xe: {car.station}</p><br/>
                {/* <li className="info-car-item d-flex">
                  <p className="info-title">Tuyến:</p>
                  <div className="info-content">{car.start} - {car.end}</div>
                </li>
                <li className="info-car-item d-flex">
                  <p className="info-title">Số lượng ghế:</p>
                  <div className="info-content">{car.capacity} ghế</div>
                </li>
                <li className="info-car-item d-flex">
                  <p className="info-title">Khởi hành:</p>
                  <div className="info-content">{car.time_start}</div>
                </li>
                <li className="info-car-item d-flex">
                  <p className="info-title">Kết thúc:</p>
                  <div className="info-content">{car.time_end}</div>
                </li> */}
             
            </div>
          </div>
        </div>
        <div className="car-feedbacks">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <div class="card-header">Danh sách đánh giá</div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    {feedbacks ? (
                      feedbacks.map((feedback, index) => (
                        <a key={index} href="/" className="list-group-item list-group-item-action flex-column align-items-start">
                          <p className="feedback-username">{feedback.feedbacks.username}</p>
                          <ReactStars
                            count={5}
                            value={feedback.rating}
                            size={18}
                            activeColor="#fb6e2e"
                          />
                          <p className="feedback-content">{feedback.content}</p>
                          <small className="feedback-time text-muted">{formatDate(feedback.createdAt)}</small>
                        </a>
                      ))
                    ) : (
                      <div> Chưa có đánh giá.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div class="card-header">Đánh giá</div>
                <div className="card-body">
                  {(
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="mb-0" for="feedbackContent">Mời bạn chia sẻ thêm một số cảm nhận ...</label>
                        <ReactStars
                          count={5}
                          value={star}
                          onChange={ratingChanged}
                          size={24}
                          activeColor="#fb6e2e"
                        />
                        <textarea
                          className="form-control"
                          id="feedbackContent"
                          rows="3"
                          name="content"
                          value={feedback}
                          onChange={handleInputChange}>
                        </textarea>
                      </div>
                      <button type="submit" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Gửi</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
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

export default CarDetails;
