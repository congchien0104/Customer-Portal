import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useHistory } from "react-router-dom";
import CarService from "../services/car.service";
import FeedbackService from "../services/feedback.service";
import AuthService from "../services/auth.service";
import { SuccessNotify } from "../utils/Notify";

function CarDetails(props) {
  let history = useHistory();
  const [company, setCompany] = useState({});
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
        setLines(response.data.data.car.lines);
        setCompany(response.data.data.company);
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
        <h1 className="heading-title">Nhà xe {company?.name}</h1>
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
                      <h2 className="card-title">Xe {car?.name}</h2>
                      <p className="card-title">Loại Xe {car?.type}</p><br/>
                      <p className="card-title">Số Chỗ {car?.capacity}</p><br/>
                      <Link to={`/company/details/${company?.id}`} className="btn btn-primary mr-2">
                        Thông tin nhà xe
                      </Link>
                      <ReactStars
                        count={5}
                        value={4}
                        size={24}
                        edit={false}
                        activeColor="#fb6e2e"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h2>Thông tin chi tiết về xe</h2>
              <ul className="info-car-list p-0">
                    <li className="info-car-item d-flex">
                      <p className="info-title">Hành Trình:</p>
                      <div className="info-content">{lines[0]?.start}  -  {lines[0]?.destination}</div>
                    </li>
                    <li className="info-car-item d-flex">
                      <p className="info-title">Thời gian:</p>
                      <div className="info-content">{lines[0]?.departure_time}  -  {lines[0]?.arrival_time}</div>
                    </li>
                    <li className="info-car-item d-flex">
                      <p className="info-title">Các Thứ Trong Tuần:</p>
                      <div className="info-content">{lines[0]?.weekdays}</div>
                    </li>
                    <li className="info-car-item d-flex">
                      <p className="info-title">Giá:</p>
                      <div className="info-content">{moneyFormatter(lines[0]?.price)}</div>
                    </li>
                    <li className="info-car-item d-flex">
                      <p className="info-title">Bến đi:</p>
                      <div className="info-content">{lines[0]?.station}</div>
                    </li>
                    <li className="info-car-item d-flex">
                      <p className="info-title">Bến Đến:</p>
                      <div className="info-content">{lines[0]?.station_to}</div>
                    </li>
                    <li className="info-car-item d-flex">
                      <button className="btn btn-success" onClick={()=> history.push(`/ticketbooking/${car.id}?date=2021-12-28`)}>
                        Đặt Ngay
                      </button>
                    </li>
                  </ul>

          <div className="journey-list">
            <h3>Danh sách điểm đón</h3>
              <ul className="list-group">
              {(lines[0]?.journeys || []).filter(item => !item.status).map((item, index) => (
                
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <span className="badge bg-primary rounded-pill d-block">{index + 1}</span>
                        <span style={{"marginLeft": "1rem"}} className="d-block ml-2">{item?.time_hour} - {item?.address}</span>
                    </div>
                </li>
              ))}
            </ul>
            <h3>Danh sách điểm trả</h3>
            <ul className="list-group">
            {(lines[0]?.journeys || []).filter(item => item.status).map((item, index) => (
              
              <li className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                      <span className="badge bg-primary rounded-pill d-block">{index + 1}</span>
                      <span style={{"marginLeft": "1rem"}} className="d-block ml-2">{item?.time_hour} - {item?.address}</span>
                  </div>
              </li>
            ))}
            </ul>
          </div>
              
              {/* {
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
              } */}
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
                            edit={false}
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

const moneyFormatter = (money) => {
  if (!money) money = 0;
  const result = new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'VND',
  }).format(money);
  return result;
};

export default CarDetails;
