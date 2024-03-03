import React, { useEffect, useState } from 'react'
import { Column} from '@ant-design/plots';
import HeaderUser from '../../components/Layout/HeaderUser'
import { Spin, Form, DatePicker, Button, message } from 'antd';
import { bloodPatientApi } from '../../api';
import axios from 'axios';
import moment from 'moment';

const ChartUser = () => {

    const token = localStorage.getItem('token');
    const [startDateBlood, setStartDateBlood] = useState("");
    const [endDateBlood, setEndDateBlood] = useState("");
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

    const handleBlood = async() => {
        try {
          const response = await axios.post(bloodPatientApi, {
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
        <div className='patient_record'>
            <HeaderUser />
            <div className='chart-blood' style={{ alignItems: "center", borderBottom: "2px solid black", padding: "10px"}}>
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
                <Form style={{marginTop: "30px", maxWidth: "400px"}} onFinish={handleBlood}>
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
                    <Button style={{alignItems: "center", height: "40px"}} className='chartbutton' block type="primary" htmlType='submit'>
                    Tra cứu
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ChartUser