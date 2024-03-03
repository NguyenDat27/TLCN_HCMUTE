import React, {useState} from "react";
import HeaderUser from "../../Layout/HeaderUser";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import "../../../css/User.css"
import axios from "axios";
import { createPatienRecordApi } from "../../../api";
import { message } from "antd";

const CreatePatientRecordForm = () => {
    const fullname = localStorage.getItem("fullname");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState(true);
    const [address, setAddress] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [identificationCard, setIdentificationCard] = useState("");
    const [allergy, setAllergy] = useState("");
    const [healthinsurance, setHealthinsurance] = useState("");
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const handleCreatePatientRecord = async(e) => {
        e.preventDefault();

        const birthdayFormatted = moment(birthday).format("MM/DD/YYYY");
        try {
            const reponse = await axios.post(createPatienRecordApi, 
            {
                fullname, 
                birthday: birthdayFormatted, 
                gender, 
                address, 
                phonenumber, 
                identificationCard, 
                allergy, 
                healthinsurance
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (reponse.status === 201) {
                message.success("Tạo hồ so thành công");
                navigate("/user/patientrecord");
            }
        } catch(error){
            console.log(error);
            message.error("Tạo hồ sơ không thành công");
        }
        
    }

    return (
        <>
        <HeaderUser/>
        <div className="create_patientrecord">
            <form onSubmit={handleCreatePatientRecord}>
                <h1>Tạo hồ sơ</h1>
                <div className="mb-3">
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Ngày sinh"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </div>
                <div className="gender">
                    <label>Giới tính</label>
                    <select
                        className="form-control"
                        value={gender ? "true" : "false"}
                        onChange={(e) => setGender(e.target.value === "true")}
                    >
                        <option value="true">Nam</option>
                        <option value="false">Nữ</option>
                    </select>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Số điện thoại"
                        value={phonenumber}
                        onChange={(e) => setPhonenumber(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="CCCD/CMND"
                        value={identificationCard}
                        onChange={(e) => setIdentificationCard(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Bệnh nền"
                        value={allergy}
                        onChange={(e) => setAllergy(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Mã BHYT"
                        value={healthinsurance}
                        onChange={(e) => setHealthinsurance(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Tạo hồ sơ
                </button>
            </form>
        </div>
        </>
    );
};

export default CreatePatientRecordForm;