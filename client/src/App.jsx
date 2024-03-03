import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import Pagenotfound from './pages/User/PageNotFound';
import HomePage from './pages/User/HomePage';
import RegisterPage from './pages/Auth/RegisterPage';
import VerifyRegisterPage from './pages/Auth/VerifyRegisterPage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import VerifyResetPasswordPage from './pages/Auth/VerifyResetPasswordPage';
import Legal from './pages/User/Legal';
import PatientRecord from './pages/User/PatientRecord';
import ChangePasswordPatientForm from './components/Form/User/ChangePasswordPatientForm';
import CreatePatientRecordForm from './components/Form/User/CreatePatientRecordForm';
import UpdatePatientRecordForm from './components/Form/User/UpdatePatientRecordForm';
import MedicalRecord from './pages/User/MedicalRecord';
import MedicalRecordDetailForm from './components/Form/User/MedicalRecordDetailForm';
import DashboardAdmin from './pages/Admin/DashboardAdmin';
import DashboardDoctor from './pages/Doctor/DashboardDoctor';
import Account from './pages/Admin/Account';
import PatientRecordAdmin from './pages/Admin/PatientRecordAdmin';
import MedicalRecordAdmin from './pages/Admin/MedicalRecordAdmin';
import ChangePasswordAdminForm from './components/Form/Admin/ChangePasswordAdminForm';
import ReissuePassword from './components/Form/Admin/Account/ReissuePassword';
import CreateAccountDoctor from './components/Form/Admin/Account/CreateAccountDoctor';
import PatientRecordDetailAdmin from './components/Form/Admin/PatientRecord/PatientRecordDetailAdmin';
import CreatePatientRecordAdmin from './components/Form/Admin/PatientRecord/CreatePatientRecordAdmin';
import UpdatePatientRecordAdmin from './components/Form/Admin/PatientRecord/UpdatePatientRecordAdmin';
import MedicalRecordDetailAdmin from './components/Form/Admin/MedicalRecord/MedicalRecordDetailAdmin';
import UpdateMedicalRecordAdmin from './components/Form/Admin/MedicalRecord/UpdateMedicalRecordAdmin';
import CreateMedicalRecordAdmin from './components/Form/Admin/MedicalRecord/CreateMedicalRecordAdmin';
import Doctor from './pages/Admin/Doctor';
import DoctorDetail from './components/Form/Admin/Doctor/DoctorDetail';
import UpdateDoctor from './components/Form/Admin/Doctor/UpdateDoctor';
import DiagnosisAdmin from './pages/Admin/DiagnosisAdmin';
import ChartAdmin from './pages/Admin/ChartAdmin';
import PatientRecordDoctor from './pages/Doctor/PatientRecordDoctor';
import CreatePatientRecordDoctor from './components/Form/Doctor/PatientRecord/CreatePatientRecordDoctor';
import PatientRecordDetailDoctor from './components/Form/Doctor/PatientRecord/PatientRecordDetailDoctor';
import UpdatePatientRecordDoctor from './components/Form/Doctor/PatientRecord/UpdatePatientRecordDoctor';
import DiagnosisDoctor from './pages/Doctor/DiagnosisDoctor';
import MedicalRecordDoctor from './pages/Doctor/MedicalRecordDoctor';
import ChartDoctor from './pages/Doctor/ChartDoctor';
import CreateMedicalRecordDoctor from './components/Form/Doctor/MedicalRecord/CreateMedicalRecordDoctor';
import MedicalRecordDetailDoctor from './components/Form/Doctor/MedicalRecord/MedicalRecordDetailDoctor';
import UpdateMedicalRecordDoctor from './components/Form/Doctor/MedicalRecord/UpdateMedicalRecordDoctor';
import ChartUser from './pages/User/ChartUser';
import ProtectedRoutePatient from './routes/ProtectedRoutePatient';
import ProtectedRouteAdmin from './routes/ProtectedRouteAdmin';
import ProtectedRouteDoctor from './routes/ProtectedRouteDoctor';
import ChangePasswordDoctorForm from './components/Form/Doctor/ChangePasswordDoctorForm';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/verifyregister' element={<VerifyRegisterPage/>}/>
      <Route path='/resetpassword' element={<ResetPasswordPage/>}/>
      <Route path='/verifyresetpassword' element={<VerifyResetPasswordPage/>}/>
      <Route path='/legal' element={<Legal />}/>
      <Route path='*' element={<Pagenotfound/>}/>
      <Route path='/user/chart' element={
        <ProtectedRoutePatient>
          <ChartUser/>
        </ProtectedRoutePatient>
      }/>
      <Route path='/user/changepassword' element={
        <ProtectedRoutePatient>
          <ChangePasswordPatientForm/>
        </ProtectedRoutePatient>
      }/>
      <Route path='/user/patientrecord' element={
        <ProtectedRoutePatient>
          <PatientRecord/>
        </ProtectedRoutePatient>
      }/>
      <Route path='/user/patientrecord/create' element={
        <ProtectedRoutePatient>
          <CreatePatientRecordForm/>
        </ProtectedRoutePatient>
      }/>
      <Route path='/user/patientrecord/update' element={
        <ProtectedRoutePatient>
          <UpdatePatientRecordForm/>
        </ProtectedRoutePatient>
      }/>
      <Route path='/user/medicalrecord' element={
        <ProtectedRoutePatient>
          <MedicalRecord/>
        </ProtectedRoutePatient>
      }/>
      <Route path='/user/medicalrecord/detail/:id' element={
        <ProtectedRoutePatient>
          <MedicalRecordDetailForm/>
        </ProtectedRoutePatient>
      }/>
      <Route path="/dashboard" element={
        <ProtectedRouteAdmin>
          <DashboardAdmin/>
        </ProtectedRouteAdmin>
      }>
        <Route path='' element={
          <ProtectedRouteAdmin>
            <ChartAdmin/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='changepass' element={
          <ProtectedRouteAdmin>
            <ChangePasswordAdminForm/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='account' element={
          <ProtectedRouteAdmin>
            <Account/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='account/createdoctor' element={
          <ProtectedRouteAdmin>
            <CreateAccountDoctor/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='account/reissuepass/:id' element={
          <ProtectedRouteAdmin>
            <ReissuePassword/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='doctor' element={
          <ProtectedRouteAdmin>
            <Doctor/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='doctor/detail/:id' element={
          <ProtectedRouteAdmin>
            <DoctorDetail/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='doctor/update/:id' element={
          <ProtectedRouteAdmin>
            <UpdateDoctor/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='patient' element={
          <ProtectedRouteAdmin>
            <PatientRecordAdmin/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='patient/read/:id' element={
          <ProtectedRouteAdmin>
            <PatientRecordDetailAdmin/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='patient/create' element={
          <ProtectedRouteAdmin>
            <CreatePatientRecordAdmin/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='patient/update/:id' element={
          <ProtectedRouteAdmin>
            <UpdatePatientRecordAdmin/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='medical' element={
          <ProtectedRouteAdmin>
            <MedicalRecordAdmin/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='medical/create' element={
          <ProtectedRouteAdmin>
            <CreateMedicalRecordAdmin/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='medical/detail/:id' element={
          <ProtectedRouteAdmin>
            <MedicalRecordDetailAdmin/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='medical/update/:id' element={
          <ProtectedRouteAdmin>
            <UpdateMedicalRecordAdmin/>
          </ProtectedRouteAdmin>
        }/>
        <Route path='diagnose' element={
          <ProtectedRouteAdmin>
            <DiagnosisAdmin/>
          </ProtectedRouteAdmin>
        }/>
      </Route>
      <Route path="/doctor" element={
        <ProtectedRouteDoctor>
          <DashboardDoctor/>
        </ProtectedRouteDoctor>
      }>
        <Route path='' element={
          <ProtectedRouteDoctor>
            <ChartDoctor/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='changepass' element={
          <ProtectedRouteDoctor>
            <ChangePasswordDoctorForm/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='patient' element={
          <ProtectedRouteDoctor>
            <PatientRecordDoctor/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='patient/read/:id' element={
          <ProtectedRouteDoctor>
            <PatientRecordDetailDoctor/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='patient/create' element={
          <ProtectedRouteDoctor>
            <CreatePatientRecordDoctor/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='patient/update/:id' element={
          <ProtectedRouteDoctor>
            <UpdatePatientRecordDoctor/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='medical' element={
          <ProtectedRouteDoctor>
            <MedicalRecordDoctor/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='medical/create' element={
          <ProtectedRouteDoctor>
            <CreateMedicalRecordDoctor/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='medical/detail/:id' element={
          <ProtectedRouteDoctor>
            <MedicalRecordDetailDoctor/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='medical/update/:id' element={
          <ProtectedRouteDoctor>
            <UpdateMedicalRecordDoctor/>
          </ProtectedRouteDoctor>
        }/>
        <Route path='diagnose' element={
          <ProtectedRouteDoctor>
            <DiagnosisDoctor/>
          </ProtectedRouteDoctor>
        }/>
      </Route>
    </Routes>
  );
}

export default App;
