import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import UserService from "../services/user.service";
import { SuccessNotify } from '../utils/Notify';

function UpdateUser(props) {
  // const initialCategoryState = {
  //   id: null,
  //   firstname: "",
  //   fullname: "",
  //   phone: "",
  //   address: "",
  // };
  // const [user, setUser] = useState(initialCategoryState);
  // const [submitted, setSubmitted] = useState(false);

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUser({ ...user, [name]: value });
  //   console.log(user);
  // };
  // const saveUser = () => {
  //   var data = {
  //     firstname: user.firstname,
  //     fullname: user.fullname,
  //     phone: user.phone,
  //     address: user.address,
  //   };

  //   UserService.update(data)
  //     .then((response) => {
        
  //       setSubmitted(true);
  //       alert("You have updated profile successfully!");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };
  // form validation rules 
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
        .required('First Name is required'),
    fullname: Yup.string()
        .required('Full name is required'),
    phone: Yup.string()
        .required('Phone is required'),
    address: Yup.string()
        .required('Address is required'),
});
const formOptions = { resolver: yupResolver(validationSchema) };

// get functions to build form with useForm() hook
const { register, handleSubmit, reset, formState } = useForm(formOptions);
const { errors } = formState;

function onSubmit(data) {
      UserService.update(data)
      .then((response) => {
        reset();
        SuccessNotify("Cập nhật thông tin thành công");
      })
      .catch((e) => {
        console.log(e);
      });
}
  return (
    <div className="co-opration-company">
      <div className="container">
        <div>
          <h1 className="heading-title text-center">Cập Nhật Thông Tin Cá Nhân</h1>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-group">
                  <label htmlFor="company-name">First Name</label>
                  <input id="company-name" type="text" {...register('firstname')} className={`form-control ${errors.firstname ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.firstname?.message}</div>
                </div>
                <div class="form-group">
                  <label htmlFor="company-name">Full Name</label>
                  <input id="company-name" type="text" {...register('fullname')} className={`form-control ${errors.fullname ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.fullname?.message}</div>
                </div>
                <div class="form-group">
                  <label htmlFor="company-name">Phone</label>
                  <input id="company-name" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.phone?.message}</div>
                </div>
                <div class="form-group">
                  <label htmlFor="company-name">Address</label>
                  <input id="company-name" type="text" {...register('address')} className={`form-control ${errors.address ? 'is-invalid' : ''}`} />
                  <div className="invalid-feedback">{errors.address?.message}</div>
                </div>
                <button type="submit" className="btn btn-primary"><i class="fas fa-paper-plane"></i> Gửi</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div class="container">
    //   <div class="row">
    //     <div class="col">
    //       <div className="submit-form">
    //         {submitted ? (
    //           <div>
    //             <h4>You have updated profile successfully!</h4>
    //           </div>
    //         ) : (
    //           <div>
    //             <div className="form-group">
    //               <label htmlFor="firstname">Firt Name</label>
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 id="firstname"
    //                 required
    //                 value={user.firstname}
    //                 onChange={handleInputChange}
    //                 name="firstname"
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label htmlFor="fullname">Full Name</label>
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 id="fullname"
    //                 required
    //                 value={user.fullname}
    //                 onChange={handleInputChange}
    //                 name="fullname"
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label htmlFor="phone">Phone</label>
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 id="phone"
    //                 required
    //                 value={user.phone}
    //                 onChange={handleInputChange}
    //                 name="phone"
    //               />
    //             </div>
    //             <div className="form-group">
    //               <label htmlFor="address">Address</label>
    //               <input
    //                 type="text"
    //                 className="form-control"
    //                 id="address"
    //                 required
    //                 value={user.adress}
    //                 onChange={handleInputChange}
    //                 name="address"
    //               />
    //             </div>

    //             <button onClick={saveUser} className="btn btn-success">
    //               Create
    //             </button>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <div class="col"></div>
    //   </div>
    // </div>
  );
}

export default UpdateUser;
