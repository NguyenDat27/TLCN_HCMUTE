import React, { useEffect, useState } from 'react'
import { createMedicalRecordAdminApi,
        readsMedicalPatientAdminApi } from '../../../../api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Button, Input, DatePicker, Form, message, Select} from 'antd';

const CreateMedicalRecordDoctor = () => {
    const [clinics, setClinics] = useState("");
    const [patient, setPatient] = useState("");
    const [patientRecords, setPatientRecords] = useState([]);
    const [date, setDate] = useState("");
    const [clinicalDiagnosis, setClinicalDiagnosis] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() =>{
        const fetchPatientRecords = async () => {
          try {
            const response = await axios.get(readsMedicalPatientAdminApi, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPatientRecords(response.data.data.medicals);
          } catch (error) {
              console.error('Lỗi khi lấy dữ liệu bệnh nhân', error);
          }
        };
        fetchPatientRecords();
      }, [token]);
    

    const handleCreateMedicalRecord = async(e) => {
        const dateFormatted = moment(date).format("MM/DD/YYYY");
        try {
            const reponse = await axios.post(createMedicalRecordAdminApi, 
            {
                clinics,
                date: dateFormatted,
                clinicalDiagnosis,
                patientId: patient,
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (reponse.status === 201) {
                message.success("Tạo hồ sơ bệnh án thành công");
                navigate("/doctor/medical");
            }
        } catch(error){
            console.log(error);
            message.error("Tạo bệnh án không thành công")
        }
    }

    const onChangePatient = (value) => {
        if (typeof value !== 'undefined') {
          console.log(`selected ${value}`);
          setPatient(value);
        } else {
          console.log('Clear selected');
          setPatient("");
        }
        console.log(patient);
      };
      
    const onSearchPatient = (value) => {
        if (typeof value !== 'undefined') {
            console.log(`selected ${value}`);
            setPatient(value);
        } else {
            console.log('Clear selected');
            setPatient("");
        }
        console.log(patient);
    };
    
    const filterOptionPatient = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const formattedPatientRecords = patientRecords.map(patient => ({
        label: `${patient.email} - ${patient.fullName}`,
        value: patient.id
    }));

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
        navigate("/doctor/medical")
    }

    return (
        <div>
            <Button type='primary' style={{backgroundColor:"green"}} onClick={handleBack}>Quay lại</Button>
            <div style={containerStyle} className='container-fluid'>
                <div className="create_medical_record">
                    <Form onFinish={handleCreateMedicalRecord}>
                        <h1>Tạo hồ sơ bệnh án</h1>
                        <Form.Item 
                            label="Bệnh nhân"
                            name="patient"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa chọn bệnh nhân"
                                }
                            ]}
                            hasFeedback
                            >
                            <Select label="Bệnh nhân"
                                showSearch
                                allowClear
                                placeholder="Tìm kiếm bệnh nhân"
                                optionFilterProp='children' 
                                onChange={onChangePatient}
                                onSearch={onSearchPatient}
                                filterOption={filterOptionPatient}
                                options={formattedPatientRecords}
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Phòng khám"
                            name="clinics"
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
                            name="date"
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
                            name="clinicaldiagnosis"
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
                        <Button block style={buttonStyle} type="primary" htmlType='submit'>
                            Tạo bệnh án
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default CreateMedicalRecordDoctor