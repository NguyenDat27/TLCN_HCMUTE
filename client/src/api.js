// export const host = "http://localhost:8080/api";
export const host = "http://165.232.171.167/api";

//Login Register ResetPasswordx`
export const loginApi = `${host}/login`;
export const registerApi = `${host}/sendemailsignup`;
export const confirmRegister = `${host}/signup`;
export const resetpassApi = `${host}/sendemailresetpass`;
export const confirmReset = `${host}/resetpass`;
export const logoutApi = `${host}/auth/logout`;

//Admin
//Account
export const readAccountApi = (page) =>
	`${host}/auth/account/reads?page=${page}&size=5`;
export const lockAccountApi = (id) => `${host}/auth/account/deactive/${id}`;
export const unlockAccountApi = (id) => `${host}/auth/account/active/${id}`;
export const reissuePassApi = (id) =>
	`${host}/auth/account/password/reset/${id}`;
export const deleteAccountApi = (id) => `${host}/auth/account/delete/${id}`;
export const createAccountDoctorApi = `${host}/auth/account/create`;

//Doctor
export const readsDoctorApi = (page) =>
	`${host}/auth/doctor/reads?page=${page}`;
export const readDoctorApi = (id) => `${host}/auth/doctor/read/${id}`;
export const updateDoctorApi = (id) => `${host}/auth/doctor/update/${id}`;
export const deleteDoctorApi = (id) => `${host}/auth/doctor/delete/${id}`;

//Patient
export const readsPatientRecordAdminApi = `${host}/auth/patientrecord/reads`;
export const readPatientRecordAdminApi = (id) =>
	`${host}/auth/patientrecord/read/${id}`;
export const createPatientRecordAdminApi = `${host}/auth/patientrecord/create`;
export const updatePatientRecordAdminApi = (id) =>
	`${host}/auth/patientrecord/update/${id}`;
export const deletePatientRecordAdminApi = (id) =>
	`${host}/auth/patientrecord/delete/${id}`;
export const searchPatientRecordAdminApi = (keyword, page) =>
	`${host}/auth/patientrecord/search?keyword=${keyword}&page=${page}`;
// export const searchAllPatientRecordAdminApi = (keyword) => `${host}/auth/patientrecord/search?keyword=${keyword}&size=100`;

//Medical
export const readsMedicalRecordAdminApi = (id) =>
	`${host}/auth/medical/reads/${id}`;
export const readsMedicalPatientAdminApi = `${host}/auth/patientrecord/search?size=1000`;
export const readsMedicalDoctorAdminApi = `${host}/auth/doctor/reads?size=1000`;
export const readMedicalRecordByPatientDoctorAdminApi = (
	patientid,
	doctorid,
	page,
	isReadAll
) =>
	`${host}/auth/medical/search?patientId=${patientid}&doctorId=${doctorid}&page=${page}&isReadAll=${isReadAll}`;
export const readAllMedicalRecordByPatientDoctorAdminApi = (
	patientid,
	doctorid,
	isReadAll
) =>
	`${host}/auth/medical/search?patientId=${patientid}&doctorId=${doctorid}&isReadAll=${isReadAll}&size=1000`;
export const readMedicalRecordDetailAdminApi = (id) =>
	`${host}/auth/medical/read/detail/${id}`;
export const deleteMedicalRecordAdminApi = (id) =>
	`${host}/auth/medical/delete/${id}`;
export const updateMedicalRecordAdminApi = (id) =>
	`${host}/auth/medical/update/${id}`;
export const createMedicalRecordAdminApi = `${host}/auth/medical/create`;

//Diagnosis Manager
export const diagnosisImageApi = `${host}/auth/doctor/predict`;
export const saveDiagnosisImageApi = (id) => `${host}/auth/doctor/save/${id}`;

//Chart Admin
export const countMedicalApi = (id) =>
	`${host}/auth/medical/count?doctor=${id}`;
export const statisticalApi = (id) =>
	`${host}/auth/medical/statistical?doctor=${id}`;
export const bloodApi = (id) =>
	`${host}/auth/medical/statistical/blood-pressure/${id}`;

//User
//Change Password
export const changePasswordApi = `${host}/auth/changepass/me`;

//Chart
export const bloodPatientApi = `${host}/auth/medical/me/statistical/blood-pressure`;

//Patient Record
export const createPatienRecordApi = `${host}/auth/patientrecord/create/me`;
export const readPatientRecordApi = `${host}/auth/patientrecord/read/me`;
export const updatePatientRecordApi = `${host}/auth/patientrecord/update/me`;

//Medical Record
export const readMedicalRecordDetailApi = (id) =>
	`${host}/auth/medical/read/detail/${id}`;
export const searchMedicalRecordApi = (keyword, page) =>
	`${host}/auth/medical/search/me?keyword=${keyword}&page=${page}`;

//Doctor
//Medical Record
export const readMedicalRecordByPatientDoctorApi = (patientid, page) =>
	`${host}/auth/medical/search?patientId=${patientid}&page=${page}`;
export const readMedicalRecordByPatientApi = (patientid) =>
	`${host}/auth/medical/search?patientId=${patientid}&size=1000`;
