import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import authService from "../../services/auth.service";
import { SuccessNotify } from "../../utils/Notify";

function ForgetPassword() {
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data) {
    authService.forgot(data)
    .then((response) => {
        reset();
        SuccessNotify("Vui lòng kiểm tra Email để lấy lại mật khẩu");
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <div className="co-opration-company">
      <div className="container">
        <div>
          <h1 className="heading-title text-center">Quên Mật Khẩu</h1>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <div className="form-group col">
                    <label>Email</label>
                    <input
                      name="email"
                      type="text"
                      {...register("email")}
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.email?.message}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mr-1">
                  Quên Mật Khẩu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
