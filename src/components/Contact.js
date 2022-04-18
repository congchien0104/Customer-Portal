import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import contactService from "../services/contact.service";
import { SuccessNotify } from "../utils/Notify";

function Contact() {
  // form validation rules 
  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
        .required('Fullname is required'),
    subject: Yup.string()
        .required('Subject is required'),
    message: Yup.string()
        .required('Message is required'),
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
});
const formOptions = { resolver: yupResolver(validationSchema) };

// get functions to build form with useForm() hook
const { register, handleSubmit, reset, formState } = useForm(formOptions);
const { errors } = formState;
const [submited, setSubmited] = useState(false);

function onSubmit(data) {
    contactService.create(data)
    .then((response) => {
      setSubmited(true);
      reset();
      SuccessNotify("Yêu cầu của bạn đã được tiếp nhận.");
    })
    .catch((error) => {
      console.log(error);
    })
}
  return (
    <section className="contact-us">
      <div className="container">
        <h1 className="heading-title">Liên hệ với chúng tôi</h1>
        <div class="row justify-content-center">
          <div class="col-md-12">
            <div class="wrapper">
              <div class="row no-gutters mb-5">
                <div class="col-md-7">
                  <div class="contact-wrap w-100 p-md-5 p-4">
                    <div id="form-message-warning" class="mb-4"></div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div class="row">
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Họ Tên</label>
                            <input name="fullname" type="text" {...register('fullname')} className={`form-control ${errors.fullname ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.fullname?.message}</div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="form-group">
                            <label>Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Chủ Đề</label>
                            <input name="subject" type="text" {...register('subject')} className={`form-control ${errors.subject ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.subject?.message}</div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <label>Nội dung</label>
                            <textarea rows={3} name="message" type="text" {...register('message')} className={`form-control ${errors.message ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.message?.message}</div>
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="form-group">
                            <input
                              type="submit"
                              value="Gửi"
                              class="btn btn-primary"
                            />
                            <div class="submitting"></div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-md-5 d-flex align-items-stretch">
                  <div id="map" className="map-us">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4842318813585!2d106.76973361533442!3d10.850726660783625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1639147807576!5m2!1svi!2s"
                      allowfullscreen=""
                      width={100 + "%"}
                      height={100 + "%"}
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="fa fa-map-marker"></span>
                    </div>
                    <div class="text">
                      <p>
                        <span>Địa chỉ:</span> Số 1 Đ. Võ Văn Ngân, Linh Chiểu,
                        TP. Thủ Đức, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="fa fa-phone"></span>
                    </div>
                    <div class="text">
                      <p>
                        <span>Số điện thoại:</span>{" "}
                        <a href="tel:0123456789">0123456789</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="fa fa-paper-plane"></span>
                    </div>
                    <div class="text">
                      <p>
                        <span>Email:</span>{" "}
                        <a href="mailto:booknow@gmail.com">
                          <span class="__cf_email__">booknow@gmail.com</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="dbox w-100 text-center">
                    <div class="icon d-flex align-items-center justify-content-center">
                      <span class="fa fa-globe"></span>
                    </div>
                    <div class="text">
                      <p>
                        <span>Website</span> <a href="#">yoursite.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
