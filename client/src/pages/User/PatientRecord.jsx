import React, { useState, useEffect } from 'react';
import HeaderUser from '../../components/Layout/HeaderUser';
import { readPatientRecordApi } from '../../api';
import "../../css/User.css"
import axios from 'axios';
import moment from 'moment/moment';

const PatientRecord = () => {
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(readPatientRecordApi, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPatientData(response.data.data.patient);
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            if (loading) {
                setLoading(false);
                setError(true);
            }
        }, 3000);

        fetchData();

        return () => clearTimeout(timeoutId);

    }, [token, loading]);

    const getGenderString = (isMale) => {
        return isMale ? 'Nam' : 'Nữ';
    };

    console.log(patientData);

    return (
        <div className='patient_record'>
            <HeaderUser />
            <h1>Hồ sơ bệnh nhân</h1>
            <div className='active'>
                {patientData ? (
                    <button onClick={() => window.location.href = '/user/patientrecord/update'}>Chỉnh sửa hồ sơ</button>
                ) : (
                <button onClick={() => window.location.href = '/user/patientrecord/create'}>Tạo hồ sơ</button>
                )}
            </div>
            {loading ? (
                <div className='loading-message'>Loading...</div>
            ) : error ? (
                <div className='error-message'>Chưa tạo hồ sơ</div>
            ) : patientData ? (
                <div className='patient_record_container'>
                    <div>Họ tên: {patientData.fullName}</div>
                    <div>Ngày sinh: {moment(patientData.birthday).format("MM/DD/YYYY")}</div>
                    <div>Giới tính: {getGenderString(patientData.gender)}</div>
                    <div>Địa chỉ: {patientData.address}</div>
                    <div>Số điện thoại: {patientData.phoneNumber}</div>
                    <div>Email: {patientData.email}</div>
                    <div>CCCD/CMND: {patientData.identificationCard}</div>
                    <div>Bệnh nền: {patientData.allergy}</div>
                    <div>Mã BHYT: {patientData.healthInsurance}</div>
                </div>
            ) : (
                <div className='error-message'>Chưa tạo hồ sơ</div>
            )}
        </div>
    );
};

export default PatientRecord;
