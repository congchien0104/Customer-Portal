import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";
import userService from "../services/user.service";

const Profile = () => {

  const [user, setUser] = useState();
  const currentUser = AuthService.getCurrentUser();

  // const getUser = (id) => {
  //   userService.getUser(id)
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
  // }
  useEffect(() => {
    userService.getUser()
    .then((response) => {
      console.log(response.data.data.user);
      setUser(response.data.data.user);
    })
    .catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="container">
     
      <h3> Trang Cá Nhân:
         <strong>{currentUser.username}</strong>
      </h3>
      <ul className="list-group">
        <li className="list-group-item">Tên Đăng Nhập:</li>
        {/* <li className="list-group-item">Email: {user.email}</li>
        <li className="list-group-item">Số Điện Thoại: {user.phone || "Chưa có"}</li>
        <li className="list-group-item">Địa Chỉ: {user.address || "Chưa có"}</li>
        <li className="list-group-item">Roles: {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}</li> */}
      </ul>
      
    </div>
  );
};

export default Profile;
