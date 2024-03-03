import React, { useState } from 'react'
import { logoutApi, changePasswordApi } from '../../../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../css/User.css"
import { message, Form, Button, Input } from 'antd';

const ChangePasswordDoctorForm = () => {

    const token = localStorage.getItem("token");
    const [oldpass, setOldpass] = useState("");
    const [newpass, setNewpass] = useState("");
    const [confirmnewpass, setConfirmnewpass] = useState("");
    const navigate = useNavigate();

    const handleChangePasswordDoctor = async() => {
        if (newpass === confirmnewpass) {   
            try {
                const response = await axios.post(changePasswordApi, {
                    passwordOld: oldpass,
                    passwordNew: newpass,
                    },{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (response.status === 200) {
                    message.success("Đổi mật khẩu thành công hãy đăng nhập lại");
                    await axios.get(logoutApi, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    localStorage.removeItem("email");
                    localStorage.removeItem("fullname");
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    navigate("/login")
                }
                if (response.status === 401){
                    message.error("Mật khẩu cũ không đúng")
                }
            }catch(err){
                if (err.response && err.response.status === 401) {
                    message.error("Mật khẩu cũ không đúng")
                } else {
                    console.log(err);
                    message.error("Lỗi")
                }
            }
        } else {
            message.error("Xác nhận mật khẩu không trùng khớp");
        }
    }

    return (
        <div>
            <div className="changepassdoctor" style={{maxWidth: "500px", alignItems: "center"}}>
                <Form onFinish={handleChangePasswordDoctor}>
                    <h1>Đổi mật khẩu</h1>
                    <Form.Item 
                        label="Mật khẩu cũ"
                        name="oldpass"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập mật khẩu cũ"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input.Password
                            type="text"
                            placeholder="Nhập mật khẩu cũ"
                            value={oldpass}
                            onChange={(e) => setOldpass(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Mật khẩu mới"
                        name="newpass"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập mật khẩu mới"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input.Password
                            type="text"
                            placeholder="Nhập mật khẩu mới"
                            value={newpass}
                            onChange={(e) => setNewpass(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Xác nhận mật khẩu"
                        name="confirmpass"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập lại mật khẩu mới"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input.Password
                            type="text"
                            placeholder="Nhập lại mật khẩu mới"
                            value={confirmnewpass}
                            onChange={(e) => setConfirmnewpass(e.target.value)}
                        />
                    </Form.Item>
                    <Button block type="primary" htmlType='submit'>
                        Xác nhận
                    </Button>
                </Form>
            </div>
        </div>
        
    )
}

export default ChangePasswordDoctorForm