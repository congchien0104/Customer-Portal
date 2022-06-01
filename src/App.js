import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import routes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SearchTicket from "./components/SearchTicket";
import NotFound from "./components/NotFound";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import CarList from "./components/CarList";
import ChangePassword from "./components/ChangePassword";
import UpdateUser from "./components/UpdateUser";
import CarDetails from "./components/CarDetails";
import Booking from "./components/Booking";
import Lines from "./components/Lines";
import Company from "./components/Company";
import Contact from "./components/Contact";
import RouteCar from "./components/RouteCar";
import SuccessPayment from "./components/SuccessPayment";
import DenyPayment from "./components/DenyPayment";
import BookingHistory from "./components/BookingHistory";
import ResultTicket from "./components/ResultTicket";
import TicketBooking from "./components/TicketBooking";
import ForgetPassword from "./components/Forget/ForgetPassword";
import NewPassword from "./components/Forget/NewPassword";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Router from "./router";
import Checkout from "./components/Booking/Booking";
import InfoUser from "./components/InforUser";

function App() {
  return (
    <div className="App">
      {/* <Router></Router> */}
      <Header />

      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/signup" component={Register} /> */}
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={SignIn} />
        
        <Route path="/confirm/:confirmationCode" component={Welcome} />
        <Route exact path="/profile" component={InfoUser} />
        <Route exact path="/user/changepassword" component={ChangePassword} />
        <Route exact path="/user/update" component={UpdateUser} />
        <Route exact path="/carlist" component={CarList} />
        <Route path="/carlist/:id" component={CarDetails} />

        <Route exact path="/booking/:id" component={Booking} />
        <Route exact path="/temp" component={Checkout} />
        <Route exact path="/booking-history/:id" component={BookingHistory} />
        <Route exact path="/lines" component={Lines} />
        <Route exact path="/lines/:id" component={RouteCar} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/payment-success" component={SuccessPayment} />
        <Route exact path="/payment-denied" component={DenyPayment} />
        <Route exact path="/resultticket" component={ResultTicket} />
        <Route exact path="/ticketbooking/:id" component={TicketBooking} />
        <Route path="/forgot" component={ForgetPassword} />
        <Route path="/reset/:confirmationCode" component={NewPassword} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as
      <ToastContainer /> */}
    </div>
  );
}

export default App;
