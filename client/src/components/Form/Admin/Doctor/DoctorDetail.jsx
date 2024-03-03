import React from 'react'
import { readDoctorApi } from '../../../../api';
import moment from 'moment';
import axios from 'axios';
import { Button } from 'antd';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchDoctorDetail = async () => {
        try {
          const response = await axios.get(readDoctorApi(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.data.doctor);
          setData(response.data.data.doctor);
        } catch (error) {
          console.error('Lỗi khi lấy dữ liệu bác sĩ', error);
        }
      };
      fetchDoctorDetail();
    }, [id]);

    const handleGenderToString = (gender) => {
        if (gender === true) {
            return "Nam"
        } else {
            return "Nữ"
        }
    }
    const handleBack = () => {
      navigate("/dashboard/doctor");
    }
    return (
        <>
            <h1>Chi tiết bác sĩ</h1>
            <Button type='primary' style={{backgroundColor:"green"}} onClick={handleBack}>Quay lại</Button>
            <div className='medicalrecord_detail_container'>
                <p>Họ tên: {data.fullName}</p>
                <p>Ngày sinh: {moment(data.birthday).format("MM/DD/YYYY")}</p>
                <p>Địa chỉ: {data.address}</p>
                <p>Số điện thoại: {data.phoneNumber}</p>
                <p>Email: {data.email}</p>
                <p>Giới tính: {handleGenderToString(data.gender)}</p>
                <p>Chứng minh nhân dân: {data.identificationCard}</p>
                <p>Khoa: {data.department}</p>
                <p>Chức vụ: {data.title}</p>
            </div>
        </> 
    );
};

export default DoctorDetail