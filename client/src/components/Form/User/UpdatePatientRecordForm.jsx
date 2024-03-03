import React, { useState, useEffect } from 'react'
import HeaderUser from '../../Layout/HeaderUser';
import { readPatientRecordApi, updatePatientRecordApi } from '../../../api';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const UpdatePatientRecordForm = () => {

  const [patientData, setPatientData] = useState(null);
  const token = localStorage.getItem("token");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [identificationCard, setIdentificationCard] = useState("");
  const [allergy, setAllergy] = useState("");
  const [healthinsurance, setHealthinsurance] = useState("");
  const navigate = useNavigate();

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
        alert('Lỗi');
      }
    };

    fetchData();
  }, [token]);

  const getGenderString = (isMale) => {
    return isMale ? 'Nam' : 'Nữ';
  };

  const getBooleanFromGenderString = (genderString) => {
    return genderString === 'Nam';
  };

  useEffect(() => {
    if (patientData) {
      setFullname(patientData.fullName);
      setBirthday(moment(patientData.birthday).format("YYYY-MM-DD"));
      setGender(getGenderString(patientData.gender));
      setAddress(patientData.address);
      setPhonenumber(patientData.phoneNumber);
      setIdentificationCard(patientData.identificationCard);
      setAllergy(patientData.allergy);
      setHealthinsurance(patientData.healthInsurance);
    }
  }, [patientData]);

  const handleUpdatePatientRecord = async (e) => {
    e.preventDefault();
    const birthdayFormatted = moment(birthday).format("MM/DD/YYYY");
    try {
      const res = await axios.put(
        updatePatientRecordApi,
        {
          fullname,
          birthday: birthdayFormatted,
          gender: getBooleanFromGenderString(gender),
          address,
          phonenumber,
          identificationCard,
          allergy,
          healthinsurance,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        message.success("Chỉnh sửa hồ sơ thành công");
        navigate("/user/patientrecord");
      }
    } catch (error) {
      console.log(error);
      message.error("Chỉnh hồ sơ không thành công");
    }
  };
  return (
    <div>
      <HeaderUser/>
      <div className="create_patientrecord">
            <form onSubmit={handleUpdatePatientRecord}>
                <h1>Chỉnh sửa hồ sơ</h1>
                <div className="mb-3">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Họ tên"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Ngày sinh"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="gender">
                    <label>Giới tính</label>
                    <select
                        className="form-control"
                        value={gender ? "true" : "false"}
                        onChange={(e) => setGender(e.target.value === "true")}
                    >
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Số điện thoại"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CCCD/CMND"
                        value={identificationCard}
                        onChange={(e) => setIdentificationCard(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Bệnh nền"
                        value={allergy}
                        onChange={(e) => setAllergy(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Mã BHYT"
                        value={healthinsurance}
                        onChange={(e) => setHealthinsurance(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Chỉnh sửa
                </button>
            </form>
        </div>
    </div>
  )
}

export default UpdatePatientRecordForm