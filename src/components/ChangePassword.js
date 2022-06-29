import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import UserService from "../services/user.service";
import { ErrorNotify, SuccessNotify } from "../utils/Notify";


function ChangePassword() {


  // form validation rules 
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .min(6, 'oldPassword must be at least 6 characters')
        .required('oldPassword is required'),
    newPassword: Yup.string()
        .min(6, 'newPassword must be at least 6 characters')
        .required('newPassword is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    function onSubmit(data) {
      UserService.changePassword(data).then(
        (response) => {
          setMessage("");
          setSuccessful(false);
          SuccessNotify("Đổi mật khẩu thành công");
          reset();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          ErrorNotify("Đổi mật khẩu không thành công");
          setSuccessful(false);
        }
      );
    }
  return (
    <div className="co-opration-company">
      <div className="container">
        <div>
          <h1 className="heading-title text-center">Thay Đổi Mật Khẩu</h1>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-group">
                  <label htmlfor="oldPassword">Mật khẩu cũ</label>
                  <input name="oldPassword" type="password" {...register('oldPassword')} className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.oldPassword?.message}</div>
                </div>
                <div class="form-group">
                  <label htmlfor="newPassword">Mật khẩu mới</label>
                  <input name="newPassword" type="password" {...register('newPassword')} className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.newPassword?.message}</div>
                </div>
                <div class="form-group">
                  <label htmlfor="confirmPassword">Nhập lại mật khẩu mới</label>
                  <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                </div>
                <button type="submit" className="btn btn-primary"><i class="fas fa-paper-plane"></i>Đổi mật khẩu</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;