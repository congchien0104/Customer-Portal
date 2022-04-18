import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../firebase";
import companyService from "../services/company.service";
import { SuccessNotify } from "../utils/Notify";
import authService from "../services/auth.service";
import { Redirect } from "react-router-dom";


function Company(props) {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
    console.log(user);
  }, []);
  // form validation rules 
    const validationSchema = Yup.object().shape({
    name: Yup.string()
          .required('Name is required'),
    phone: Yup.string()
          .required('Phone is required'),
    email: Yup.string()
          .required('Email is required')
          .email('Email is invalid'),
    address: Yup.string()
          .required('Address is required')
    });   
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const [file, setFile] = useState();
    const [submited, setSubmited] = useState(false);

    const handleImageChange = (e) => {
      setFile(e.target.files[0]);
    };


    function onSubmit(data) {
        const storageRef = ref(storage, 'companies/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            (snapshot) => {},
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(
                    async (downloadURL) => {
                        data.image = downloadURL;
                        companyService.create(data)
                        .then((response) => {
                          setSubmited(true);
                          SuccessNotify("Yêu cầu của bạn đã được gửi đi, chờ xét duyện.");
                        })
                        .catch((error) => {
                          console.log(error);
                        })
                    }
                );
            }
        );
    }
  return (
    <div className="co-opration-company">
      <div className="container">
        {
          currentUser ? (
            <div>
              <h1 className="heading-title text-center">Đăng ký trở thành đối tác</h1>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                      <label htmlFor="company-name">Tên nhà xe</label>
                      <input id="company-name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>
                    <div class="form-group">
                      <label htmlFor="company-phone">Số điện thoại nhà xe</label>
                      <input id="company-phone" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.phone?.message}</div>
                    </div>
                    <div class="form-group">
                      <label htmlFor="company-email">Email</label>
                      <input id="company-email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div class="form-group">
                      <label htmlFor="company-address">Địa chỉ nhà xe</label>
                      <input id="company-address" type="text" {...register('address')} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.address?.message}</div>
                    </div>
                    <label htmlFor="company-image">Ảnh nhà xe</label>
                    <input
                      type="file"
                      class="form-control-file mb-4"
                      id="company-image"
                      onChange={handleImageChange}
                    />
                    <button type="submit" className="btn btn-primary"><i class="fas fa-paper-plane"></i> Gửi</button>
                  </form>
                </div>
              </div>
            </div>
          
          ) : (
            <p>Vui lòng đăng nhập để trở thành đối tác của trang web.</p>
          )
        }
      </div>
    </div>
  );
}

export default Company;
