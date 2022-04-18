import '../style.css';

function Footer(){
  return (
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>Địa chỉ</h6>
            <p class="text-justify">Công ty TNHH Thương Mại Dịch Vụ BOOKNOW</p>
            <p class="text-justify">Địa chỉ: Số 1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</p>
            <p class="text-justify">Email: <a href="mailto:booknow@gmail.com">booknow@gmail.com</a></p>
            <p class="text-justify">Điện thoại: <a href="tel:0123456789">0123456789</a></p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Booknow Lines</h6>
            <ul class="footer-links">
              <li><a href="/#">Trang chủ</a></li>
              <li><a href="/#">Nhà xe</a></li>
              <li><a href="/#">Tuyến xe</a></li>
              <li><a href="/#">Liên hệ</a></li>
              <li><a href="/#">Trở thành đối tác</a></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Kết nối với chúng tôi</h6>
            <ul class="social-icons">
              <li><a class="facebook" href="/#"><i class="fab fa-facebook"></i></a></li>
              <li><a class="twitter" href="/#"><i class="fab fa-twitter"></i></a></li>
              <li><a class="dribbble" href="/#"><i class="fab fa-dribbble"></i></a></li>
              <li><a class="linkedin" href="/#"><i class="fab fa-linkedin"></i></a></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved
            </p>
          </div>
          <div class="col-md-4 col-sm-6 col-xs-12 text-right">
            <a target="_blank" href="http://www.online.gov.vn/CustomWebsiteDisplay.aspx?DocId=14037" rel="noreferrer" class="dangkyImg-link" data-v-63ec0ebf="">
              <img src="https://futabus.vn/_nuxt/img/DaDangKy.a6a4b24.png" alt="bộ công thương"/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;