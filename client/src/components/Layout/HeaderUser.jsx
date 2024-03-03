import React from "react";
import logo from "../../assets/logo.png"
import axios from "axios";
import { logoutApi } from "../../api";
import "../../css/Home/Navbar.css";
import "../../css/Header.css"
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";

function HeaderUser() {

  const fullname = localStorage.getItem("fullname");
  const navigate = useNavigate();

  const handleLogout = async () => {

    const token = localStorage.getItem("token");  
    try{
      const response = await axios.get(logoutApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
      if (response.status === 200) {
        localStorage.removeItem("email");
        localStorage.removeItem("fullname");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        message.success("Đăng xuất thành công")
        navigate("/")
      } else {
        message.error("Đăng xuất thất bại")
      }
    } catch(error) {
      console.log(error);
      alert("Lỗi")
    }
  }

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
           <span className="navbar-sign">
              <img className="image_logo" src={logo} alt="logo"/>
           </span>
        </Link>
      </h1>
      <ul className="navbar-items">
        <li>
          <Link to="/" className="navbar-links">
            Trang chủ
          </Link>
        </li>
        <li>
          <a href="/#services" className="navbar-links">
            Dịch vụ
          </a>
        </li>
        <li>
          <a href="/#about" className="navbar-links">
            Thông tin
          </a>
        </li>
        <li>
          <a href="/#reviews" className="navbar-links">
            Đánh giá
          </a>
        </li>
        <li>
          <a href="/#doctors" className="navbar-links">
            Đội ngũ
          </a>
        </li>
      </ul>
      {!fullname ? (
        <ul className="navbar_LoRe">
          <li>
            <ion-icon name="person-outline"></ion-icon>
          </li>
          <li>
            <a href="/login" className="navbar-link">
              Đăng nhập
            </a>
          </li>
          <li>
            <a href="/register" className="navbar-link">
              Đăng ký
            </a>
          </li>
        </ul>
      ) : (
        <div className="options">
          <span>{fullname}</span>
          <i class="ri-user-line"></i>
          <div className="dropdown">
            <i class="ri-arrow-down-s-line dropdown__arrow"></i>
            <div className="dropdown_menu">
              <a href="/user/chart">Biểu đồ huyết áp</a>
              <a href="/user/patientrecord">Hồ sơ bệnh nhân</a>
              <a href="/user/medicalrecord">Hồ sơ bệnh án</a>
              <a href="/user/changepassword">Đổi mật khẩu</a>
              <a className="log_out" onClick={handleLogout}>Đăng xuất</a>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default HeaderUser;
