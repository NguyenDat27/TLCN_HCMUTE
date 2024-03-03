import React, { useState, useEffect } from 'react'
import HeaderUser from '../../Layout/HeaderUser'
import { useParams } from 'react-router-dom'
import { readMedicalRecordDetailApi } from '../../../api'
import axios from 'axios'
import '../../../css/User.css'

const MedicalRecordDetailForm = () => {

  const { id } = useParams();
  const [medicalRecord, setMedicalRecord] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMedicalRecordDetail = async () => {
      try {
        const response = await axios.get(readMedicalRecordDetailApi(id), {
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


  return (
    <div className='medicalrecord_detail'>
      <HeaderUser/>
      <h1>Chi tiết bệnh án</h1>
      <button onClick={() => window.location.href = '/user/medicalrecord'}>Quay lại</button>
      {medicalRecord ? (
        <div className='medicalrecord_detail_container'>
          <p>Ngày khám: {medicalRecord.date}</p>
          <p>Tên bệnh nhân: {medicalRecord.namePatient}</p>
          <p>Tên bác sĩ: {medicalRecord.nameDoctor}</p>
          <p>Phòng khám: {medicalRecord.clinics}</p>
          <p>Chẩn đoán lâm sàng: {medicalRecord.clinicalDiagnosis}</p>
          <p>Chẩn đoán: {medicalRecord.diagnosis}</p>
          {medicalRecord.diagnosticImages ? (
            <>
              <p className='diagnosis-header'>Thông tin hình ảnh chẩn đoán:</p>
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
        <p>Loading...</p>
      )}
    </div>   
  )
}

export default MedicalRecordDetailForm