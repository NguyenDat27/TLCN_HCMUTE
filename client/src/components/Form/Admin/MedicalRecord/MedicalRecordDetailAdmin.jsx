import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { readMedicalRecordDetailAdminApi } from '../../../../api'
import axios from 'axios'
import moment from 'moment'
import { Spin, Alert, Button } from 'antd'

const MedicalRecordDetailAdmin = () => {  

  const { id } = useParams();
  const [medicalRecord, setMedicalRecord] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicalRecordDetail = async () => {
      try {
        const response = await axios.get(readMedicalRecordDetailAdminApi(id), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMedicalRecord(response.data.data.medical);
        console.log(response.data.data.medical);
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết hồ sơ bệnh án', error);
      }
    };

    fetchMedicalRecordDetail();
  }, [id]);

  const handleBack = () => {
    navigate("/dashboard/medical")
  }
  
  return (
    <div>
      <Button type='primary' style={{backgroundColor:"green"}} onClick={handleBack}>Quay lại</Button>
      <h1>Chi tiết bệnh án</h1>
      {medicalRecord ? (
        <div className='medicalrecord_detail_container'>
          <p>Ngày khám: {moment(medicalRecord.date).format("MM/DD/YYYY")}</p>
          <p>Tên bệnh nhân: {medicalRecord.namePatient}</p>
          <p>Tên bác sĩ: {medicalRecord.nameDoctor}</p>
          <p>Phòng khám: {medicalRecord.clinics}</p>
          <p>Chẩn đoán lâm sàng: {medicalRecord.clinicalDiagnosis}</p>
          <p>Chẩn đoán: {medicalRecord.diagnosis}</p>
          {medicalRecord.diagnosticImages ? (
            <>
              <p className='diagnosis-header'>Thông tin hình ảnh chẩn đoán:</p>
              <p>Bác sĩ chẩn đoán: {medicalRecord.diagnosticImages.doctor}</p>
              <p>Phương pháp: {medicalRecord.diagnosticImages.method}</p>
              <p>Kết luận: {medicalRecord.diagnosticImages.conclude}</p>
              <p>Nội dung: {medicalRecord.diagnosticImages.content}</p>
              {medicalRecord.diagnosticImages.urlImage && (
                <img src={medicalRecord.diagnosticImages.urlImage} alt="Diagnostic Image" />
              )}
            </>
          ) : (
            <p>Không có thông tin hình ảnh chẩn đoán.</p>
          )}
        </div>
      ) : (
        <Spin tip="Đang load ...">
        <Alert
          message="Hãy chờ một chút"
          description="Đang lấy dữ liệu"
          type='info'
        />
      </Spin>
      )}
    </div> 
  )
}

export default MedicalRecordDetailAdmin