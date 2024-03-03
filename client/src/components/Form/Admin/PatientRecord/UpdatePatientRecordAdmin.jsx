import React, {useState, useEffect} from 'react'
import { updatePatientRecordAdminApi, 
        readPatientRecordAdminApi } from '../../../../api'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { Input, Button, Form, message, DatePicker, Select} from 'antd';

const UpdatePatientRecordAdmin = () => {
    const [patientData, setPatientData] = useState(null);
    const token = localStorage.getItem("token");
    const {id} = useParams();
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
          const response = await axios.get(readPatientRecordAdminApi(id), {
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
  
    useEffect(() => {
      if (patientData) {
        setFullname(patientData.fullName);
        setBirthday(moment(patientData.birthday).format('YYYY-MM-DD'));
        setGender(patientData.gender);
        setAddress(patientData.address);
        setPhonenumber(patientData.phoneNumber);
        setIdentificationCard(patientData.identificationCard);
        setAllergy(patientData.allergy);
        setHealthinsurance(patientData.healthInsurance);
      }
    }, [patientData]);
    
    const handleUpdatePatientRecord = async (e) => {
      const birthdayFormatted = moment(birthday).format("MM/DD/YYYY");
      try {
        const res = await axios.put(updatePatientRecordAdminApi(id),
          {
            fullname,
            birthday: birthdayFormatted,
            gender,
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
          navigate("/dashboard/patient");
        }
      } catch (error) {
        console.log(error);
        message.error("Chỉnh sửa hồ sơ không thành công");
      }
    };

    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const buttonStyle = {
        backgroundColor: 'blue',
        color: 'white',
        cursor: 'pointer',
    };
    const handleBack = () => {
        navigate("/dashboard/patient")
    }
    return (
      <div>
        <Button type='primary' style={{backgroundColor:"green"}} onClick={handleBack}>Quay lại</Button>
        <div style={containerStyle} className='container-fluid'>
            <div className="update_patient_record">
                <Form onFinish={handleUpdatePatientRecord}>
                    <h1>Cập nhật hồ sơ bệnh nhân</h1>
                    <Form.Item 
                        label="Họ tên"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập họ tên"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập họ tên"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Ngày sinh"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa chọn ngày"
                            }
                        ]}
                        hasFeedback
                        >
                        <DatePicker
                            picker='date'
                            style={{width:"100%"}}
                            placeholder="Chọn ngày"
                            value={birthday ? moment(birthday, 'YYYY-MM-DD') : null}
                            onChange={(date, dateString) => setBirthday(dateString)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Giới tính"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa chọn giới tính"
                            }
                        ]}
                        hasFeedback
                        >
                        <Select placeholder="Chọn giới tính"
                            value={gender}
                            onChange={(value) => setGender(value)}
                        >
                            <Select.Option value={true}>Nam</Select.Option>
                            <Select.Option value={false}>Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item 
                        label="Địa chỉ"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập địa chỉ"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập số điện thoại"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập số điện thoại"
                            value={phonenumber}
                            onChange={(e) => setPhonenumber(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="CMND/CCCD"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập CCCD/CMND"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập CCCD/CMND"
                            value={identificationCard}
                            onChange={(e) => setIdentificationCard(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Bệnh nền"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập bệnh nền"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập bệnh nền"
                            value={allergy}
                            onChange={(e) => setAllergy(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Số BHYT"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập BHYT"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập số BHYT"
                            value={healthinsurance}
                            onChange={(e) => setHealthinsurance(e.target.value)}
                        />
                    </Form.Item>
                    <Button block style={buttonStyle} type="primary" htmlType='submit'>
                        Chỉnh sửa hồ sơ
                    </Button>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default UpdatePatientRecordAdmin