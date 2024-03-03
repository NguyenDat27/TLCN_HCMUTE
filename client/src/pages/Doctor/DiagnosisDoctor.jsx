import React, { useState, useEffect } from 'react'
import { Button, Form, Select, Input, message } from 'antd'
import UploadImage from '../../data/UploadImage'
import axios from 'axios'
import { diagnosisImageApi, 
        saveDiagnosisImageApi, 
        readsMedicalPatientAdminApi,
        readMedicalRecordByPatientApi} from '../../api'
import moment from 'moment';

const DiagnosisDoctor = () => {

  const token = localStorage.getItem("token");
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [patient, setPatient] = useState("");
  const [patientRecords, setPatientRecords] = useState([]);
  const [medical, setMedical] = useState("");
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [method, setMethod] = useState("");
  const [content, setContent] = useState("");

  const handleImageUpload = (url) => {
    setImage(url);
    console.log(image);
  };

  const handleDiagnosisImage = async() => {
    try {
      const response = await axios.post(diagnosisImageApi, 
      {
        image,
      },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200){
        setResult(response.data.data.result);
        message.success("Đã chẩn đoán xong")
        console.log(response);
      }
    }catch(error){
      console.log(error);
      message.error("Không tìm thấy kết quả")
    }
  }

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

  useEffect(() =>{
    const fetchMedicalsByPatient = async () => {
        try {
            const response = await axios.get(readMedicalRecordByPatientApi(patient), {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
            });
          setMedicalRecords(response.data.data.medicals);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu bệnh nhân', error);
        };
    };
    fetchMedicalsByPatient();
  }, [token, patient]);

  const handleSaveResult = async(id) => {
    try {
      const response = await axios.post(saveDiagnosisImageApi(id), 
      {
        method,
        content,
        urlImage: image,
        conclude: result,
      },{
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200){
        console.log(response);
        message.success("Lưu thành công")
      }
    }catch(error){
      console.log(error);
      message.error("Lưu không thành công")
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

  const onChangeMedical = (value) => {
    if (typeof value !== 'undefined') {
      setMedical(value);
    } else {
      console.log('Clear selected');
      setMedical("");
    }
  };

  const onSearchMedical = (value) => {
    if (typeof value !== 'undefined') {
      setMedical(value);
    } else {
      setMedical("");
    }
  };

  const filterOptionMedical = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const formattedMedicalRecords = medicalRecords.map(medical => ({
    label: `Ngày khám: ${moment(medical.date).format("MM/DD/YYYY")} - Bệnh nhân: ${medical.namePatient} - Bác sĩ: ${medical.nameDoctor}`,
    value: medical.id
  }));

  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='readimage'>
          <UploadImage onImageUpload={handleImageUpload}/>
          {image ? (
            <div>
              <Button className='redict' 
                      onClick={handleDiagnosisImage}
                      style={{marginTop: "5px", marginBottom: "5px"}}>Chẩn đoán</Button>
              <br/>
              <span>Kết quả: {result}</span>
            </div>
          ) : (
            <h5>Hãy tải ảnh lên để chẩn đoán</h5>
          )}
        </div>
      </div>
      <div className='col-md-6'>
        {result ? (
        <div className='saveimage'>
          <h2>Lưu kết quả</h2>
            <Select mode='default'
              showSearch
              allowClear
              style={{minWidth: "490px"}}
              placeholder="Tìm kiếm bệnh nhân"
              optionFilterProp='children' 
              onChange={onChangePatient}
              onSearch={onSearchPatient}
              filterOption={filterOptionPatient}
              options={formattedPatientRecords}
            />
          <Form onFinish={() => handleSaveResult(medical)}>
            <Form.Item 
                name="medical"
                rules={[
                  {
                      required: true,
                      message: "Bạn chưa chọn bệnh án"
                  }
                ]}
                hasFeedback
              >
              <Select mode='default' 
                showSearch
                allowClear
                style={{minWidth: "490px", marginTop:"5px"}}
                placeholder="Tìm kiếm bệnh án"
                optionFilterProp='children' 
                onChange={onChangeMedical}
                onSearch={onSearchMedical}
                filterOption={filterOptionMedical}
                options={formattedMedicalRecords}
              />
            </Form.Item>
            <Form.Item 
              label="Phương pháp"
              name="method"
              rules={[
                  {
                      required: true,
                      message: "Bạn chưa nhập phương pháp"
                  }
              ]}
              hasFeedback
              >
              <Input
                  type="text"
                  placeholder="Nhập phương pháp"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
              />
            </Form.Item>
            <Form.Item 
              label="Nội dung"
              name="content"
              rules={[
                  {
                      required: true,
                      message: "Bạn chưa nhập nội dung"
                  }
              ]}
              hasFeedback
              >
              <Input
                  type="text"
                  placeholder="Nhập nội dung"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
              />
            </Form.Item>
            <Button block type="primary" htmlType='submit'>
              Lưu 
            </Button>
          </Form>
        </div>
        ) : (
          <h2 style={{fontSize: "25px"}}>Thực hiện chẩn đoán để lưu kết quả</h2>
        )}
      </div>
    </div>
  )
}

export default DiagnosisDoctor
