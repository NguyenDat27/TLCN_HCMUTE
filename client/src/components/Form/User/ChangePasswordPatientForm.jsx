import React, { useState , useEffect} from 'react'
import HeaderUser from '../../Layout/HeaderUser';
import { logoutApi } from '../../../api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../../css/User.css"
import { changePasswordApi } from '../../../api';

const ChangePasswordPatientForm = () => {

    const token = localStorage.getItem("token");
    const [oldpass, setOldpass] = useState("");
    const [newpass, setNewpass] = useState("");
    const [confirmnewpass, setConfirmnewpass] = useState("");
    const navigate = useNavigate();

    const handleChangePasswordPatient = async(e) => {
        e.preventDefault();
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
                    alert("Đổi mật khẩu thành công hãy đăng nhập lại");
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
                    alert("Mật khẩu cũ không đúng")
                }
            }catch(err){
                if (err.response && err.response.status === 401) {
                    alert("Mật khẩu cũ không đúng");
                } else {
                    console.log(err);
                    alert("Lỗi");
                }
            }
        } else {
            alert("Xác nhận mật khẩu không trùng khớp");
        }
    }

    return (
        <div>
            <HeaderUser/>
            <div className="create_patientrecord">
                <form onSubmit={handleChangePasswordPatient}>
                    <h1>Đổi mật khẩu</h1>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Mật khẩu cũ"
                            value={oldpass}
                            onChange={(e) => setOldpass(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Mật khẩu mới"
                            value={newpass}
                            onChange={(e) => setNewpass(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmnewpass}
                            onChange={(e) => setConfirmnewpass(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Xác nhận
                    </button>
                </form>
            </div>
        </div>
        
    )
}

export default ChangePasswordPatientForm