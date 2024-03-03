import React, {useState} from 'react'
import axios from 'axios';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Form, message, DatePicker, Select} from 'antd';
import { createAccountDoctorApi } from '../../../../api';
const CreateAccountDoctor = () => {
    
    const [fullname, setFullname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState(true);
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [identificationCard, setIdentificationCard] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

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
    const handleCreateAccountDoctor = async() => {

        console.log('Starting handleCreateAccountDoctor...');

        const birthdayFormatted = moment(birthday).format("MM/DD/YYYY");
        try {
            const reponse = await axios.post(createAccountDoctorApi, 
            {
                fullname, 
                birthday: birthdayFormatted, 
                gender, 
                address, 
                phonenumber,
                email,
                password,
                identificationCard, 
                department, 
                title,
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (reponse.status === 201) {
                message.success("Tạo tài khoản thành công")
                navigate("/dashboard/account");
            }
        } catch(error){
            console.log(error);
            message.error("Tạo tài khoản không thành công");
        }
        
    }

    const handleBack = () => {
        navigate("/dashboard/account")
    }

    return (
        <div>
            <Button type='primary' style={{backgroundColor:"green"}} onClick={handleBack}>Quay lại</Button>
            <div style={containerStyle} className='container-fluid'>
                <div className="create_account_doctor">
                    <Form onFinish={handleCreateAccountDoctor}>
                        <h1>Tạo tài khoản bác sĩ</h1>
                        <Form.Item 
                            label="Họ tên"
                            name="fullname"
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
                            label="Giới tính"
                            name="gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa chọn giới tính"
                                }
                            ]}
                            hasFeedback
                            >
                            <Select placeholder="Chọn giới tính"
                                value={gender ? "true" : "false"}
                                onChange={(e) => setGender(e.target.value === "true")}
                            >
                                <Select.Option value="true">Nam</Select.Option>
                                <Select.Option value="false">Nữ</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            label="Ngày sinh"
                            name="birthday"
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
                                value={birthday ? moment(birthday, 'MM/DD/YYYY') : null}
                                onChange={(date, dateString) => setBirthday(dateString)}
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Địa chỉ"
                            name="address"
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
                            name="phonenumber"
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
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa chọn ngày"
                                },
                                {
                                    type: email,
                                    message: "Không đúng định dạng email"
                                }
                            ]}
                            hasFeedback
                            >
                            <Input
                                type="text"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Bạn chưa nhập mật khẩu"
                                }
                            ]}
                            hasFeedback
                            >
                            <Input.Password
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item 
                            label="CMND/CCCD"
                            name="cccd"
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
                            name="khoa"
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
                            name="chucdanh"
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
                                placeholder="Nhập chức danh"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Item>
                        <Button block style={buttonStyle} type="primary" htmlType='submit'>
                            Tạo tài khoản
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountDoctor