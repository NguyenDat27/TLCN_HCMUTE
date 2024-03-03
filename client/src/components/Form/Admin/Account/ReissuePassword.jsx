import React, {useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {Form, Input, Button, message} from 'antd'
import axios from 'axios';
import { reissuePassApi } from '../../../../api';

const ReissuePassword = () => {

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const token = localStorage.getItem("token");
    const {id} = useParams();
    const navigate = useNavigate();

    const handleReissuePassword = async() => {

        if (password === confirmpassword) {
            try {
                const reponse = await axios.put(reissuePassApi(id),
                {
                    password,
                },{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (reponse.status === 200) {
                    message.success("Cấp lại mật khẩu thành công");
                    navigate("/dashboard/account");
                }
            } catch(error){
                console.log(error);
                message.error("Cấp lại mật khẩu không thành công");
            }
        } else {
            message.error("Nhập lại mật khẩu sai")
        }   
    }

    const handleBack = () => {
        navigate("/dashboard/account")
    }

    return (
        <div>
            <Button type='primary' style={{backgroundColor: "green"}} onClick={handleBack}>Quay lại</Button>
            <div style={{ maxWidth: '400px', margin: 'auto' }}>
                <h2 style={{ textAlign: 'center' }}>Cấp lại mật khẩu</h2>
                <Form onFinish={handleReissuePassword}>
                    <Form.Item 
                        label="Mật khẩu mới" 
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
                            placeholder='Nhập mật khẩu mới' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Xác nhận mật khẩu mới" 
                        name="confirmpassword"
                        rules={[
                            {
                                required: true,
                                message: "Bạn chưa nhập lại mật khẩu"
                            }
                        ]}
                        hasFeedback
                        >
                        <Input.Password 
                            placeholder='Nhập lại mật khẩu mới' 
                            value={confirmpassword}
                            onChange={(e) => setConfirmpassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button block type='primary' htmlType='submit'>Xác nhận</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default ReissuePassword