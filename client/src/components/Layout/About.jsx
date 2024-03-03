import React from "react";
import Doctor from "../../assets/homepage/doctor-group.png";
import SolutionStep from "./SolutionStep";
import "../../css/Home/About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>Thông tin về chúng tôi</span>
        </h3>
        <p className="about-description">
        Chào mừng bạn đến với bệnh viện Danh Tài Đức, đối tác đáng tin cậy của bạn về khả năng tiếp cận và
        chăm sóc sức khoẻ cá nhân. Các bác sĩ chuyên môn của chúng tôi cung cấp dịch vụ tư vấn trực tuyến
        và các dịch vụ chuyên biệt, ưu tiên sức khỏe của bạn. Tham gia cùng chúng tôi
        cuộc hành trình hướng tới một bạn khỏe mạnh hơn.
        </p>

        <h4 className="about-text-title">Giải pháp</h4>

        <SolutionStep
          title="Chọn chuyên gia"
          description="Tìm chuyên gia hoàn hảo của bạn và đăng ký dễ dàng tại bệnh viện. Các bác sĩ chuyên môn ưu tiên sức khỏe của bạn và cung cấp dịch vụ chăm sóc phù hợp."
        />

        <SolutionStep
          title="Lên lịch"
          description="Hãy chọn ngày và giờ phù hợp nhất với bạn và để đội ngũ chuyên gia y tế tận tâm của chúng tôi đảm bảo sức khỏe cho bạn bằng dịch vụ chăm sóc cá nhân."
        />

        <SolutionStep
          title="Nhận lời khuyên"
          description="Các bác sĩ và chuyên gia giàu kinh nghiệm của chúng tôi sẵn sàng cung cấp lời khuyên chuyên môn và kế hoạch điều trị được cá nhân hóa, giúp bạn đạt được sức khỏe tốt nhất có thể."
        />
      </div>
    </div>
  );
}

export default About;
