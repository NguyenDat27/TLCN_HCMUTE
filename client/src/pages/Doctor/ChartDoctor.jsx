import React, { useEffect, useState } from 'react'
import { Column} from '@ant-design/plots';
import { bloodApi, readsMedicalPatientAdminApi,} from '../../api';
import { Select, Spin, Form, DatePicker, Button, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const ChartDoctor = () => {

  const token = localStorage.getItem('token');
  const [startDateBlood, setStartDateBlood] = useState("");
  const [endDateBlood, setEndDateBlood] = useState("");
  const [patientBlood, setPatientBlood] = useState("");
  const [patientRecordsBlood, setPatientRecordsBlood] = useState([]);
  const [dataBlood, setDataBlood] = useState([]);
  const [configBlood, setConfigBlood] = useState({
    data: [],
    xField: 'Date',
    yField: 'scales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  });
  const [eventClickedBlood, setEventClickBlood] = useState(false)

  useEffect(() =>{
    const fetchPatientRecords = async () => {
      try {
        const response = await axios.get(readsMedicalPatientAdminApi, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setPatientRecordsBlood(response.data.data.medicals);
      } catch (error) {
          console.error('Lỗi khi lấy dữ liệu bệnh nhân', error);
      }
    };
    fetchPatientRecords();
  }, [token]);

  const onChangePatientBlood = (value) => {
    if (typeof value !== 'undefined') {
      console.log(`selected ${value}`);
      setPatientBlood(value);
    } else {
      console.log('Clear selected');
      setPatientBlood("");
      console.log(doctor);
    }
  };

  const onSearchPatientBlood = (value) => {
    if (typeof value !== 'undefined') {
      console.log(`selected ${value}`);
      setPatientBlood(value);
    } else {
      console.log('Clear selected');
      setPatientBlood("");
      console.log(doctor);
    }
  };

  const filterOptionPatientBlood = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const formattedPatientRecordsBlood = patientRecordsBlood.map(patient => ({
    label: `${patient.email} - ${patient.fullName}`,
    value: patient.id
  }));

  const handleBlood = async(id) => {
    try {
      const response = await axios.post(bloodApi(id), {
          startDate: startDateBlood,
          endDate: endDateBlood,
        },{
          headers: {
              Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200){
        setDataBlood(response.data.data.statistical);
        setEventClickBlood(true);
        console.log(dataBlood);
        message.success("Tra cứu thành công")
      }
    }catch(error){
      console.log(error);
      message.error("Tra cứu không thành công")
    }
  }

  useEffect(() => {
    const updatedConfig = {
      ...configBlood,
      data: dataBlood,
    };
    setConfigBlood(updatedConfig);
  }, [dataBlood]);

  return (
    <div>
      <div className='chart-blood' style={{ borderBottom: "2px solid black", padding: "10px"}}>
        <h3 style={{fontSize: "25px", marginBottom: "10px"}}>Biểu đồ lượng huyết áp của bệnh nhân</h3>
        {eventClickedBlood ? (
          dataBlood.length > 0 ? (
            <Column {...configBlood} />
          ) : (
            <h3 style={{fontSize: "20px", color: "red"}}>Không có dữ liệu để hiển thị</h3>
          )
        ) : (
          <Spin tip="Đang load ..."/>
        )}
        <Form style={{marginTop: "30px", maxWidth: "400px"}} onFinish={() => {handleBlood(patientBlood)}}>
          <Form.Item 
            label="Ngày bắt đầu"
            name="startdateblood"
            rules={[
                {
                    required: true,
                    message: "Bạn chưa chọn ngày bắt đầu"
                }
            ]}
            hasFeedback
            >
            <DatePicker
                picker='date'
                style={{width:"100%"}}
                placeholder="Chọn ngày bắt đầu"
                value={startDateBlood ? moment(startDateBlood, 'YYYY-MM-DD') : null}
                onChange={(date, dateString) => setStartDateBlood(dateString)}
            />
          </Form.Item>
          <Form.Item 
            label="Ngày kết thúc"
            name="enddateblood"
            rules={[
                {
                    required: true,
                    message: "Bạn chưa chọn ngày kết thúc"
                }
            ]}
            hasFeedback
            >
            <DatePicker
                picker='date'
                style={{width:"100%"}}
                placeholder="Chọn ngày kết thúc"
                value={endDateBlood ? moment(endDateBlood, 'YYYY-MM-DD') : null}
                onChange={(date, dateString) => setEndDateBlood(dateString)}
            />
          </Form.Item>
          <Form.Item 
            name="patientblood"
            rules={[
              {
                  required: true,
                  message: "Bạn chưa chọn bệnh nhân"
              }
            ]}
            hasFeedback
            >
            <Select mode='default' 
              showSearch
              allowClear
              style={{minWidth: "400px", marginTop:"5px"}}
              placeholder="Tra cứu lượng huyết áp của bệnh nhân"
              optionFilterProp='children' 
              onChange={onChangePatientBlood}
              onSearch={onSearchPatientBlood}
              filterOption={filterOptionPatientBlood}
              options={formattedPatientRecordsBlood}
            />
          </Form.Item>
          <Button block type="primary" htmlType='submit'>
            Tra cứu
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default ChartDoctor