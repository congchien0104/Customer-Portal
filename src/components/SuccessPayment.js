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
              <h1>Thanh toán Paypal thành công !</h1>
              <p>Bạn đã đặt vé xe thành công.</p>
              <a href="/" className='success-color'>Quay lại trang chủ</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SuccessPayment;