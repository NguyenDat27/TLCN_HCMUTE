import React, { useEffect, useState } from 'react'
import { Column, Line } from '@ant-design/plots';
import { bloodApi, countMedicalApi, readsMedicalDoctorAdminApi, readsMedicalPatientAdminApi, statisticalApi } from '../../api';
import { Select, Spin, Alert, Form, DatePicker, Button, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const ChartAdmin = () => {

  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [countMedical, setCountMedical] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctorRecords, setDoctorRecords] = useState([]);
  const [startDateStatistical, setStartDateStatistical] = useState("");
  const [endDateStatistical, setEndDateStatistical] = useState("");
  const [doctorStatistical, setDoctorStatistical] = useState("");
  const [doctorRecordsStatistical, setDoctorRecordsStatistical] = useState([]);
  const [dataStatistical, setDataStatistical] = useState([]);
  const [configStatistical, setConfigStatistical] = useState({
    data: [],
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      tickCount: 5,
    },
  });
  const [eventClickedStatistical, setEventClickStatistial] = useState(false)
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

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const startTime = new Date();
        const response = await axios.get(countMedicalApi(doctor), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCountMedical(response.data.data.count);
        const endTime = new Date();
        const fetchTime = endTime - startTime;
        setLoadingTime(fetchTime);
      } catch (error) {
        console.error('Error fetching data:', error);
      }finally{
        setTimeout(() =>{
          setLoading(false);
        },3000)
      }
    };
    fetchData();
  }, [token, doctor]);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, loadingTime+1000);
      return () => clearTimeout(timer);
    }
  }, [loading, loadingTime]);

  useEffect(() =>{
    const fetchDoctorRecords = async () => {
      try {
        const response = await axios.get(readsMedicalDoctorAdminApi, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setDoctorRecords(response.data.data.doctors);
      } catch (error) {
          console.error('Lỗi khi lấy dữ liệu bác sĩ', error);
      }
    };
    fetchDoctorRecords();
  }, [token]);

  const onChangeDoctor = (value) => {
    if (typeof value !== 'undefined') {
      console.log(`selected ${value}`);
      setDoctor(value);
    } else {
      console.log('Clear selected');
      setDoctor("");
      console.log(doctor);
    }
  };

  const onSearchDoctor = (value) => {
    if (typeof value !== 'undefined') {
      console.log(`selected ${value}`);
      setDoctor(value);
    } else {
      console.log('Clear selected');
      setDoctor("");
      console.log(doctor);
    }
  };

  const filterOptionDoctor = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const formattedDoctorRecords = doctorRecords.map(doctor => ({
    label: `${doctor.email} - ${doctor.fullName}`,
    value: doctor.id
  }));

  useEffect(() =>{
    const fetchDoctorRecordsStatistical = async () => {
      try {
        const response = await axios.get(readsMedicalDoctorAdminApi, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setDoctorRecordsStatistical(response.data.data.doctors);
      } catch (error) {
          console.error('Lỗi khi lấy dữ liệu bác sĩ', error);
      }
    };
    fetchDoctorRecordsStatistical();
  }, [token]);

  const onChangeDoctorStatistical = (value) => {
    if (typeof value !== 'undefined') {
      console.log(`selected ${value}`);
      setDoctorStatistical(value);
    } else {
      console.log('Clear selected');
      setDoctorStatistical("");
      console.log(doctor);
    }
  };

  const onSearchDoctorStatistical = (value) => {
    if (typeof value !== 'undefined') {
      console.log(`selected ${value}`);
      setDoctorStatistical(value);
    } else {
      console.log('Clear selected');
      setDoctorStatistical("");
      console.log(doctor);
    }
  };

  const filterOptionDoctorStatistical = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const formattedDoctorRecordsStatistical = doctorRecordsStatistical.map(doctor => ({
    label: `${doctor.email} - ${doctor.fullName}`,
    value: doctor.id
  }));

  const handleStatistical = async(id) => {
    try {
      const response = await axios.post(statisticalApi(id), {
          startDate: startDateStatistical,
          endDate: endDateStatistical,
        },{
          headers: {
              Authorization: `Bearer ${token}`,
          },
        });
      if (response.status === 200){
        setDataStatistical(response.data.data.statistical);
        setEventClickStatistial(true);
        console.log(dataStatistical);
        message.success("Tra cứu thành công")
      }
    }catch(error){
      console.log(error);
      message.error("Tra cứu không thành công")
    }
  }

  useEffect(() => {
    const updatedConfig = {
      ...configStatistical,
      data: dataStatistical,
    };
    setConfigStatistical(updatedConfig);
  }, [dataStatistical]);

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
      <div className='count-medical' style={{ borderBottom: "2px solid blue", padding: "10px"}}>
        <h3 style={{fontSize: "25px"}}>Số lượng bệnh án</h3>
        <Select mode='default'
          showSearch
          allowClear
          style={{minWidth: "400px", marginTop: "20px", marginBottom: "20px"}}
          placeholder="Tra cứu số lượng bệnh án của bác sĩ "
          optionFilterProp='children' 
          onChange={onChangeDoctor}
          onSearch={onSearchDoctor}
          filterOption={filterOptionDoctor}
          options={formattedDoctorRecords}
        />
        { !loading ? (
        <h3 style={{fontSize: "20px", color: "red"}}>Kết quả: {countMedical}</h3>
        ) : (
          <Spin tip="Đang load ...">
          <Alert
            message="Hãy chờ một chút"
            description="Đang lấy số lượng bệnh án"
            type='info'
          />
        </Spin>
        )
      }
      </div>
      <div className='chart-medical' style={{ borderBottom: "2px solid green", padding: "10px"}}>
        <h3 style={{fontSize: "25px", marginBottom: "10px"}}>Biểu đồ số lượng bệnh án</h3>
        {eventClickedStatistical ? (
          dataStatistical.length > 0 ? (
            <Line {...configStatistical} />
          ) : (
            <h3 style={{fontSize: "20px", color: "red"}}>Không có dữ liệu để hiển thị</h3>
          )
        ) : (
          <Spin tip="Đang load ..."/>
        )};
        <Form style={{marginTop: "30px", maxWidth: "400px"}} onFinish={() => {handleStatistical(doctorStatistical)}}>
          <Form.Item 
            label="Ngày bắt đầu"
            name="startdatestatistical"
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
                value={startDateStatistical ? moment(startDateStatistical, 'YYYY-MM-DD') : null}
                onChange={(date, dateString) => setStartDateStatistical(dateString)}
            />
          </Form.Item>
          <Form.Item 
            label="Ngày kết thúc"
            name="enddatestatistical"
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
                value={endDateStatistical ? moment(endDateStatistical, 'YYYY-MM-DD') : null}
                onChange={(date, dateString) => setEndDateStatistical(dateString)}
            />
          </Form.Item>
          <Form.Item name="doctorstatistical">
            <Select mode='default' 
              showSearch
              allowClear
              style={{minWidth: "400px", marginTop:"5px"}}
              placeholder="Tra cứu số lượng bệnh án của bác sĩ"
              optionFilterProp='children' 
              onChange={onChangeDoctorStatistical}
              onSearch={onSearchDoctorStatistical}
              filterOption={filterOptionDoctorStatistical}
              options={formattedDoctorRecordsStatistical}
            />
          </Form.Item>
          <Button block type="primary" htmlType='submit'>
            Tra cứu
          </Button>
        </Form>
      </div>
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
        )};
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

export default ChartAdmin