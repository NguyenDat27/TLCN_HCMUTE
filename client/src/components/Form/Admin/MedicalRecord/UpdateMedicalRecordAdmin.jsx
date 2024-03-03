import React, {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { readMedicalRecordDetailAdminApi, 
        updateMedicalRecordAdminApi } from '../../../../api'
import { Input, Button, Form, message, DatePicker} from 'antd';


const UpdateMedicalRecordAdmin = () => {

    const [medicalData, setMedicalData] = useState(null);
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const [clinics, setClinics] = useState("");
    const [date, setDate] = useState("");
    const [clinicalDiagnosis, setClinicalDiagnosis] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(readMedicalRecordDetailAdminApi(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.data.medical.date);
          setMedicalData(response.data.data.medical);
        } catch (error) {
          console.log(error);
          alert('Lỗi');
        }
      };
      fetchData();
    }, [token]);
  
    useEffect(() => {
      if (medicalData) {
        setClinics(medicalData.clinics)
        setDate(moment(medicalData.date).format("YYYY-MM-DD"));
        setClinicalDiagnosis(medicalData.clinicalDiagnosis);
        setDiagnosis(medicalData.diagnosis);
      }
    }, [medicalData]);
  
    const handleUpdateMedicalRecord = async () => {
      const dateFormatted = moment(date).format("MM/DD/YYYY");
      try {
        const res = await axios.put(updateMedicalRecordAdminApi(id),
          {
            clinics,
            date: dateFormatted,
            clinicalDiagnosis,
            diagnosis,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          message.success("Chỉnh sửa hồ sơ bệnh án thành công")
          navigate("/dashboard/medical");
        }
      } catch (error) {
        console.log(error);
        message.error("Chỉnh sửa hồ sơ bệnh án thất bại")
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
        navigate("/dashboard/medical")
    }

    return (
      <div>
        <Button type='primary' style={{backgroundColor:"green"}} onClick={handleBack}>Quay lại</Button>
        <div style={containerStyle} className='container-fluid'>
            <div className="update_medical_record">
                <Form onFinish={handleUpdateMedicalRecord}>
                    <h1>Cập nhật hồ sơ bệnh án</h1>
                    <Form.Item 
                        label="Phòng khám"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập phòng khám"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập phòng"
                            value={clinics}
                            onChange={(e) => setClinics(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Ngày khám"
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
                            value={date ? moment(date, 'YYYY-MM-DD') : null}
                            onChange={(date, dateString) => setDate(dateString)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Chẩn đoán lâm sàng"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập chẩn đoán lâm sàng"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập chẩn đoán lâm sàng"
                            value={clinicalDiagnosis}
                            onChange={(e) => setClinicalDiagnosis(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Chẩn đoán"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập chẩn đoán"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập chẩn đoán"
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                        />
                    </Form.Item>
                    <Button block style={buttonStyle} type="primary" htmlType='submit'>
                        Chỉnh sửa
                    </Button>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default UpdateMedicalRecordAdmin