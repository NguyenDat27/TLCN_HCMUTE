import React from "react";
import DoctorCard from "./DoctorCard";
import profile1 from "../../assets/homepage/profile-1.png";
import profile2 from "../../assets/homepage/profile-2.png";
import profile3 from "../../assets/homepage/profile-3.png";
import profile4 from "../../assets/homepage/profile-4.png";
import "../../css/Home/Doctors.css";

function Doctors() {
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Bác sĩ được đánh giá cao</span>
        </h3>

        <p className="dt-description">
        Gặp gỡ đội ngũ bác sĩ chuyên khoa đặc biệt của chúng tôi, 
        tận tâm cung cấp các dịch vụ chăm sóc sức khỏe hàng đầu tại Danh Tài Đức. 
        Hãy tin tưởng vào kiến thức và kinh nghiệm của họ để dẫn bạn tới một cuộc sống khỏe mạnh
        và hạnh phúc hơn.
        </p>
      </div>

      <div className="dt-cards-content">
        <DoctorCard
          img={profile1}
          name="BS. Lê Tuấn Anh"
          title="Khoa Tai-Mũi-Họng"
          stars="4.9"
          reviews="1800"
        />
        <DoctorCard
          img={profile2}
          name="BS. Phan Văn Chí"
          title="Khoa Thần Kinh"
          stars="4.8"
          reviews="700"
        />
        <DoctorCard
          img={profile3}
          name="BS. Trương Hiếu Nghĩa"
          title="Khoa Tim Mạch"
          stars="4.7"
          reviews="450"
        />
        <DoctorCard
          img={profile4}
          name="BS. Nguyễn Xuân Tài"
          title="Khoa Chuẩn Đoán"
          stars="4.8"
          reviews="500"
        />
      </div>
    </div>
  );
}

export default Doctors;
