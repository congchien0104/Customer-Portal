import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function SuccessPayment() {
  return (
    <div className="success-payment">
      <div class="row">
        <div class="col-md-6 mx-auto mt-5">
          <div class="payment">
            <div class="payment_header success-color">
              <div class="check"><i class="fa fa-check" aria-hidden="true"></i></div>
            </div>
            <div class="content">
              <h1>Payment Success !</h1>
              <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. </p>
              <a href="/" className='success-color'>Go to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SuccessPayment;