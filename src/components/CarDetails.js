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
        SuccessNotify("????nh gi?? th??nh c??ng");
        getFeedbacks(props.match.params.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="car-details">
      <div className="container">
        <h1 className="heading-title text-danger">Nh?? xe {company?.name}</h1>
        <div className="row">
          <div className="col-6 mb-2">
            <div className="card">
              <img className="card-img-top" src={car.image} alt={car.name} />
              <div className="card-body">
                <div className="row justify-content-between">
                  <div className="col-auto">
                    <h2 className="card-title text-primary">Xe {car?.name}</h2>
                    <ReactStars
                      count={5}
                      value={4}
                      size={24}
                      edit={false}
                      activeColor="#fb6e2e"
                    />
                    <p className="card-title">Lo???i Xe {car?.type}</p>
                    <p className="card-title">Bi???n S??? {car?.plate_number}</p>
                    <p className="card-title">S??? Ch??? {car?.capacity}</p>
                    <br />
                    <Link
                      to={`/company/details/${company?.id}`}
                      className="btn btn-primary mr-2"
                    >
                      Th??ng tin nh?? xe
                    </Link>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className = "col-6">
            <h2 className="text-primary">Th??ng tin chi ti???t v??? chuy???n xe</h2>
            <div className="row">
            <div className = "col-6">
              <p className="info-title">H??nh Tr??nh:</p>
              <p className="info-title">Th???i gian:</p>
              <p className="info-title">C??c Th??? Trong Tu???n:</p>
              <p className="info-title">Gi??:</p>
              <p className="info-title">B???n ??i:</p>
              <p className="info-title">B???n ?????n:</p>
            </div>
            <div className = "col-6">
              <p className="info-title">{lines[0]?.start} - {lines[0]?.destination}</p>
              <p className="info-title">{lines[0]?.departure_time} - {lines[0]?.arrival_time}</p>
              <p className="info-title">{lines[0]?.weekdays}</p>
              <p className="info-title fw-bold">{moneyFormatter(lines[0]?.price)}</p>
              <p className="info-title">{lines[0]?.station}</p>
              <p className="info-title">{lines[0]?.station_to}</p>
            </div>
            </div>
            <div className="journey-list row">
            <div className="col-6">
            <h3 className="text-primary">Danh s??ch ??i???m ????n</h3>
            <ul className="list-group">
              {(lines[0]?.journeys || [])
                .filter((item) => !item.status)
                .map((item, index) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <span className="badge bg-primary rounded-pill d-block">
                        {index + 1}
                      </span>
                      <span
                        style={{ marginLeft: "1rem" }}
                        className="d-block ml-2"
                      >
                        {item?.time_hour} - {item?.address}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
            </div>
            <div className="col-6">
            <h3 className="text-primary">Danh s??ch ??i???m tr???</h3>
              <ul className="list-group">
                {(lines[0]?.journeys || [])
                  .filter((item) => item.status)
                  .map((item, index) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-primary rounded-pill d-block">
                          {index + 1}
                        </span>
                        <span
                          style={{ marginLeft: "1rem" }}
                          className="d-block ml-2"
                        >
                          {item?.time_hour} - {item?.address}
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            </div>
          </div>
          <div className="col-6">
            <div className="car-feedbacks">
              <div className="card  mb-2">
                <div class="card-header fw-bold">????nh gi??</div>
                <div className="card-body">
                  {
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="mb-0" for="feedbackContent">
                          M???i b???n chia s??? th??m m???t s??? c???m nh???n ...
                        </label>
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
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                      <button type="submit" class="btn btn-primary">
                        <i class="fas fa-paper-plane"></i> G???i
                      </button>
                    </form>
                  }
                </div>
              </div>
              <div className="card">
                <div class="card-header fw-bold">Danh s??ch ????nh gi??</div>
                <div className="card-body">
                  <div className="list-group list-group-flush">
                    {feedbacks ? (
                      feedbacks.map((feedback, index) => (
                        <a
                          key={index}
                          href="/"
                          className="list-group-item list-group-item-action flex-column align-items-start"
                        >
                          <p className="feedback-username">
                            {feedback.feedbacks.username}
                          </p>
                          <ReactStars
                            count={5}
                            value={feedback.rating}
                            size={18}
                            edit={false}
                            activeColor="#fb6e2e"
                          />
                          <p className="feedback-content">{feedback.content}</p>
                          <small className="feedback-time text-muted">
                            {formatDate(feedback.createdAt)}
                          </small>
                        </a>
                      ))
                    ) : (
                      <div> Ch??a c?? ????nh gi??.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

  return [day, month, year].join("-");
};

const moneyFormatter = (money) => {
  if (!money) money = 0;
  const result = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  }).format(money);
  return result;
};

export default CarDetails;
