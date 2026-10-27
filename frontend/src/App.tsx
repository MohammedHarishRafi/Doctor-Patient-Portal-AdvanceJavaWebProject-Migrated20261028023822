import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/modern-ui.css';
import './styles/original-jsp-styles.css';
import AdminLoginComponent from './components/AdminLoginComponent';
import ChangePasswordComponent from './components/ChangePasswordComponent';
import DoctorLoginComponent from './components/DoctorLoginComponent';
import IndexComponent from './components/IndexComponent';
import SignupComponent from './components/SignupComponent';
import UserAppointmentComponent from './components/UserAppointmentComponent';
import UserLoginComponent from './components/UserLoginComponent';
import ViewAppointmentComponent from './components/ViewAppointmentComponent';
import AdminDoctorComponent from './components/AdminDoctorComponent';
import AdminEditDoctorComponent from './components/AdminEditDoctorComponent';
import AdminIndexComponent from './components/AdminIndexComponent';
import AdminNavbarComponent from './components/AdminNavbarComponent';
import AdminPatientComponent from './components/AdminPatientComponent';
import AdminViewDoctorComponent from './components/AdminViewDoctorComponent';
import ComponentAllcssComponent from './components/ComponentAllcssComponent';
import ComponentFooterComponent from './components/ComponentFooterComponent';
import ComponentFootersimpleComponent from './components/ComponentFootersimpleComponent';
import ComponentNavbarComponent from './components/ComponentNavbarComponent';
import DoctorCommentComponent from './components/DoctorCommentComponent';
import DoctorEditProfileComponent from './components/DoctorEditProfileComponent';
import DoctorIndexComponent from './components/DoctorIndexComponent';
import DoctorNavbarComponent from './components/DoctorNavbarComponent';
import DoctorPatientComponent from './components/DoctorPatientComponent';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<AdminLoginComponent />} />
        <Route path="/changepassword" element={<ChangePasswordComponent />} />
        <Route path="/doctorlogin" element={<DoctorLoginComponent />} />
        <Route path="/" element={<IndexComponent />} />
        <Route path="/index" element={<IndexComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/userappointment" element={<UserAppointmentComponent />} />
        <Route path="/userlogin" element={<UserLoginComponent />} />
        <Route path="/viewappointment" element={<ViewAppointmentComponent />} />
        <Route path="/admindoctor" element={<AdminDoctorComponent />} />
        <Route path="/admineditdoctor" element={<AdminEditDoctorComponent />} />
        <Route path="/adminindex" element={<AdminIndexComponent />} />
        <Route path="/adminnavbar" element={<AdminNavbarComponent />} />
        <Route path="/adminpatient" element={<AdminPatientComponent />} />
        <Route path="/adminviewdoctor" element={<AdminViewDoctorComponent />} />
        <Route path="/componentallcss" element={<ComponentAllcssComponent />} />
        <Route path="/componentfooter" element={<ComponentFooterComponent />} />
        <Route path="/componentfootersimple" element={<ComponentFootersimpleComponent />} />
        <Route path="/componentnavbar" element={<ComponentNavbarComponent />} />
        <Route path="/doctorcomment" element={<DoctorCommentComponent />} />
        <Route path="/doctoreditprofile" element={<DoctorEditProfileComponent />} />
        <Route path="/doctorindex" element={<DoctorIndexComponent />} />
        <Route path="/doctornavbar" element={<DoctorNavbarComponent />} />
        <Route path="/doctorpatient" element={<DoctorPatientComponent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;