import React, { useEffect, useState } from "react";
import Doctor from "../../assets/homepage/doctor-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../../css/Home/Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/register");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">❤️ BỆNH VIỆN DANH TÀI ĐỨC</p>
          <h2 className="text-title">
            Tìm bác sĩ và đăng ký 
          </h2>
          <p className="text-descritpion">
          Nói chuyện với bác sĩ trực tuyến và nhận lời khuyên y tế, 
          đơn thuốc trực tuyến, thuốc bổ sung và ghi chú y tế trong vòng vài phút. 
          Dịch vụ chăm sóc sức khỏe theo yêu cầu trong tầm tay bạn.
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> Đăng ký
          </button>
          <div className="text-stats">
            <div className="text-stats-container">
              <p>500.000+</p>
              <p>Bệnh Nhân</p>
            </div>

            <div className="text-stats-container">
              <p>100+</p>
              <p>Bác Sĩ</p>
            </div>

            <div className="text-stats-container">
              <p>10+</p>
              <p>Thành Lập</p>
            </div>

            <div className="text-stats-container">
              <p>500+</p>
              <p>Giường Bệnh</p>
            </div>
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Hero;
