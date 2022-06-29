import React from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const Welcome = (props) => {
  if (props.match.path === "/confirm/:confirmationCode") {
    AuthService.verifyUser(props.match.params.confirmationCode);
  }

  return (
    <div className="container" style={{"height":"50vh"}}>
      <h3 className="text-success fw-bold text-center" style={{"paddingTop":"20vh"}}>
        <strong>Xác thực tài khoản thành công!</strong>
      </h3>
      {/* <div>
        <Link to={"/login"} className="nav-link">
          Please Login
        </Link>
        Please Login
      </div> */}
    </div>
  );
};

export default Welcome;
