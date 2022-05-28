import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BookingHistory from "../BookingHistory";
import ChangePassword from "../ChangePassword";
import Profile from "../Profile";
import UpdateUser from "../UpdateUser";


const InfoUser = () => {
  return (
    <div className="info-user pt-3" style={{ "minHeight": "calc(100vh - 404px)", "background": "#f5f5f5" }}>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div class="list-group list-group-flush flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button class="list-group-item active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">
                Tài khoản của tôi
              </button>
              <button class="list-group-item" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                Đổi mật khẩu
              </button>
              <button class="list-group-item" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                Cập nhật tài khoản
              </button>
              <button class="list-group-item" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                Lịch sử đặt vé
              </button>
            </div>
          </div>
          <div className="col-9" style={{ "background": "#fff", "minHeight": "50rem", "borderRadius": "5px", "border": "1px solid ##00000014", "boxShadow": "0 1px #00000014"}}>
            <div class="tab-content" id="v-pills-tabContent">
              <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                <Profile />
              </div>
              <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                <ChangePassword />
              </div>
              <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">
                <UpdateUser />
              </div>
              <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabindex="0">
                <BookingHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;