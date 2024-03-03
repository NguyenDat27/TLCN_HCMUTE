import React, { useState} from "react";
import axios from "axios";
import { loginApi } from "../../api";
import { useNavigate} from "react-router-dom";
import img_logo from '../../assets/logo.png';
import img_login from "../../assets/login/hopital.jpg";
import '../../css/Auth.css';
import HeaderUser from "../../components/Layout/HeaderUser";
import { message } from "antd";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post(loginApi,
                        {email, password});
            if (response.status===200) {
                localStorage.setItem("email", response.data.data.email);
                localStorage.setItem("fullname", response.data.data.fullname);
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("role", response.data.data.role)
                if (response.data.data.role === "PATIENT") {
                    message.success(`Xin chào người dùng ${response.data.data.fullname}`);
                    navigate("/");
                } else if (response.data.data.role === "DOCTOR") {
                    message.success(`Xin chào bác sĩ ${response.data.data.fullname}`);
                    navigate("/doctor/");
                } else if (response.data.data.role === "ADMIN") {
                    message.success("Xin chào admin");
                    navigate("/dashboard");
                }
            }
        } catch(error) {
            console.log(error);
            message.error("Đăng nhập thất bại")
        }
    };
    return (
        <div className="login">
            <HeaderUser/>
            <div className="login-page" style={{minHeight: "90vh"}}>
                <form onSubmit={handleSubmit}>
                <div className="login-page-container">
                    <div className="img-login-container">
                        <img className="img-login" src={img_login} alt="Ảnh bệnh viện" />
                    </div>
                    <div className="form-container">
                        <img className="img-logo" src={img_logo} alt="Logo" />
                        <h1 className="title">Đăng nhập</h1>
                        <div className="mb-2">
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                type="text"
                                placeholder="Email của bạn"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <input
                                id="matkhau"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control"
                                type="password"
                                placeholder="Mật khẩu"
                                required
                            />
                        </div>
                        <a href="/resetpassword" className="forgot-password">Quên mật khẩu ?</a>
                        <div className="d-flex justify-content-center">
                            <button className="submit-btn">
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
};

export default LoginPage;