import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faClock} from "@fortawesome/free-solid-svg-icons";
import "../../css/Home/Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>Dịch vụ</span>
        </h3>
        <p className="info-description">
        Chúng tôi mang đến sự chăm sóc sức khỏe thuận tiện cho bạn, 
        cung cấp một loạt các dịch vụ y tế theo yêu cầu phù hợp với nhu cầu của bạn. 
        Nền tảng của chúng tôi cho phép bạn kết nối với các bác sĩ trực tuyến có kinh nghiệm, 
        những người cung cấp lời khuyên y tế chuyên môn, vấn đề trực tuyến
        đơn thuốc và cung cấp thêm thuốc nhanh chóng bất cứ khi nào bạn yêu cầu.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Cấp cứu"
          description="Dịch vụ Chăm sóc khẩn cấp của chúng tôi được thiết kế
           để hỗ trợ đáng tin cậy cho bạn trong những tình huống nguy cấp. 
           Cho dù đó là bệnh tật, chấn thương đột ngột hay bất kỳ mối lo ngại y tế nào 
           cần được chăm sóc ngay lập tức, đội ngũ chuyên gia chăm sóc sức khỏe tận tâm của chúng tôi 
           luôn sẵn sàng 24/7 để cung cấp dịch vụ chăm sóc nhanh chóng và hiệu quả."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Trình độ"
          description="Đội ngũ bác sĩ và chuyên gia y tế giàu kinh nghiệm 
            của chúng tôi sử dụng công nghệ tiên tiến để đánh giá sức khỏe
            của bạn và thiết kế các kế hoạch điều trị cá nhân hóa. 
            Từ sàng lọc toàn diện đến các biện pháp can thiệp nâng cao, 
            chúng tôi cam kết giúp bạn duy trì một sức khỏe khỏe mạnh và có một cuộc sống trọn vẹn."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Thời gian"
          description="Chúng tôi thực hiện khám bệnh từ thứ 2 đến thứ 7 hàng tuần
          mỗi ngày sẽ chia làm 2 ca, ca sáng từ 6h đến 12h và ca chiều từ
          13h đến 18h, còn đối với các ca cấp cứu thì chúng tối luôn hỗ trợ 24/7"
          icon={faClock}
        />
      </div>
    </div>
  );
}

export default Info;
