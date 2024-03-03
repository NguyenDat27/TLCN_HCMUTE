import React, {useEffect, useState} from 'react'
import axios from 'axios'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { readDoctorApi, updateDoctorApi } from '../../../../api'
import { Input, Button, Form, message, DatePicker, Select} from 'antd';


const UpdateDoctor = () => {

    const [data, setData] = useState(null);
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const [fullname, setFullname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [identificationCard, setIdentificationCard] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(readDoctorApi(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data.data.doctor);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [token]);
  
    useEffect(() => {
      if (data) {
        setFullname(data.fullName)
        setBirthday(moment(data.birthday).format("YYYY-MM-DD"));
        setGender(data.gender);
        setAddress(data.address);
        setPhonenumber(data.phoneNumber);
        setIdentificationCard(data.identificationCard);
        setDepartment(data.department);
        setTitle(data.title);
      }
    }, [data]);
  
    const handleUpdateDoctor = async () => {
      const dateFormatted = moment(birthday).format("MM/DD/YYYY");
      try {
        const res = await axios.put(updateDoctorApi(id),
          {
            fullName: fullname,
            birthday: dateFormatted,
            gender,
            address,
            phoneNumber: phonenumber,
            identificationCard,
            department,
            title,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.status === 200) {
          message.success("Chỉnh sửa bác sĩ thành công")
          navigate("/dashboard/doctor");
        }
      } catch (error) {
        console.log(error);
        message.error("Chỉnh sửa bác sĩ thất bại")
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
        navigate("/dashboard/doctor")
    }

    return (
      <div>
        <Button type='primary' style={{backgroundColor:"green"}} onClick={handleBack}>Quay lại</Button>
        <div style={containerStyle} className='container-fluid'>
            <div className="update_doctor">
            <Form onFinish={handleUpdateDoctor}>
                    <h1>Cập nhật bác sĩ</h1>
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
                        label="Khoa"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập khoa"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập khoa"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Chức danh"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập chức danh"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input
                            type="text"
                            placeholder="Nhập số BHYT"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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

export default UpdateDoctor