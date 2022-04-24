import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import carService from "../services/car.service";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import reservationService from "../services/reservation.service";

function TicketBooking() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const date = urlParams.get("date");
  console.log(date);

  // form validation rules 
  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
        .required('Title is required'),
    phone: Yup.string()
        .required('First Name is required'),
    cccd: Yup.string()
        .required('Last name is required'),
    pickup_place: Yup.string()
        .required('Last name is required'),
    dropoff_place: Yup.string()
        .required('Last name is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    acceptPaypal: Yup.bool()
        .oneOf([true], 'Accept Ts & Cs is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [car, setCar] = useState();
  const [amount, setAmout] = useState(0);

  function onSubmit(data) {
    var temp = {
      amount: amount,
      carId: car.id,
      quantity: choose.length,
      reservations_date: date,
      fullname: data.fullname,
      phone: data.phone,
      email: data.email,
      cccd: data.cccd,
      pickup_place: data.pickup_place,
      dropoff_place: data.dropoff_place,
      arr: choose
    }
    console.log(temp);
    reservationService.paypal(temp)
    .then((response) => {
      console.log(response.data);
      window.location.href = response.data.data;
    })
    .catch((e) => {
      console.log(e);
    });
  }


  const { id } = useParams();
  const [seats, setSeats] = useState([]);
  const [choose, setChoose] = useState([]);
  const [positions, setPositions] = useState([]);
  const [flag, setFlag] = useState([]);
  const arr = [];

  const getCar = (id) => {
    carService.getCarSeat(id)
      .then((response) => {
        setSeats(response.data.data.car.carseats);
        setCar(response.data.data.car);
        //setAmout(response.data.data.car.price);
        console.log(response.data.data.car.carseats);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const getTicket = (id) => {
    reservationService.getPosition(id, date)
      .then((response) => {
        setPositions(response.data.data.reservation);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCar(id);
    getTicket(id);
  }, [id]);
  var temp = [];
  var result = [];
  useEffect(() => {
    console.log(positions)
    if(positions.length > 0){
      
     for(var i=0; i< positions.length; i++){
       console.log(positions[i].position.split(","));
      temp = positions[i].position.split(",");
      result = result.concat(temp);
     }
     setFlag(result);
      console.log(result);
      console.log(result.includes("A3"));
    }
  }, [positions]);
  console.log(result.includes("A3"));
  
  const handleSeat = async (e) => {
    if(e.target.checked){
      await setChoose([...choose, e.target.name]);
    }else{
      await setChoose(choose.filter((name) => name !== e.target.name));
    }
  }

  useEffect(() => {
    setAmout(choose.length*car?.price)
  }, [choose, car]);
  
  return (
    <section className="ticket-booking pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div class="col-md-4 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
              <span class="text-muted">Số vé</span>
              <span class="badge badge-secondary badge-pill">{choose.length}</span>
            </h4>
            <ul class="list-group mb-3">
              {
                choose && choose.map((item) => (
                  <li class="list-group-item d-flex justify-content-between lh-condensed" >
                    <div class="text-success">
                      <h6 class="my-0">{item}</h6>
                    </div>
                    <span class="text-muted">{car.price}</span>
                  </li>
                ))
              }
              {
                  <li class="list-group-item d-flex justify-content-between">
                    <span>Tổng giá (VND)</span>
                    <strong>{amount}</strong>
                  </li>
              }
            </ul>
          </div>
          <div class="col-md-8 order-md-1">
            <h4 class="mb-3">Thông tin thanh toán</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-md-6"></div>
              </div>
              <div class="row">
                <div class="container">
                    <div class="row row-cols-3">
                    {
                        seats && seats.map((seat, index) => (
                            <div class="col">
                              <input type="checkbox" id={seat.id} name={seat.name} disabled={ flag.includes(seat.name) } onChange={(e)=> handleSeat(e)}/>
                              <label for={seat.id}>{seat.name}</label>
                            </div>
                        ))
                    }
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label>Họ Tên</label>
                  <input name="fullname" type="text" {...register('fullname')} className={`form-control ${errors.fullname ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.fullname?.message}</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label>Số Điện Thoại</label>
                  <input name="phone" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.phone?.message}</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label>CMND/CCCD</label>
                  <input name="cccd" type="text" {...register('cccd')} className={`form-control ${errors.cccd ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.cccd?.message}</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label>Email</label>
                  <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div class="mb-3">
                  <label>Nơi Đón Khách</label>
                  <input name="pickup_place" type="text" {...register('pickup_place')} className={`form-control ${errors.pickup_place ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.pickup_place?.message}</div>
                </div>
                <div class="mb-3">
                  <label>Nơi Trả Khách</label>
                  <input name="dropoff_place" type="text" {...register('dropoff_place')} className={`form-control ${errors.dropoff_place ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.dropoff_place?.message}</div>
                </div>
                <div class="mb-3">
                  <input name="acceptPaypal" type="checkbox" {...register('acceptPaypal')} id="acceptPaypal" className={`form-check-input ${errors.acceptPaypal ? 'is-invalid' : ''}`} />
                  <label htmlFor="acceptPaypal" className="form-check-label">Chấp Nhận Thanh Toán Paypal</label>
                  <div className="invalid-feedback">{errors.acceptPaypal?.message}</div>
                </div>
              </div>
              <button class="btn btn-primary btn-lg btn-block" type="submit">
                Thanh toán
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TicketBooking;
