import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InitialPage from './components/InitialPage';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import EmployeeDashboard from './components/EmployeeDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminHolidays from './components/AdminHolidays';
import EmployeeHolidays from './components/EmployeeHolidays';
import MyProfile from './components/MyProfile';
import AddEmployee from './components/AddEmployee';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeavePolicy from './components/LeavePolicy';
import ContactHR from './components/ContactHr';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/contact-hr" element={<ContactHR/>} />
          <Route path="/leave-policy" element={<LeavePolicy/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/holidays" element={<EmployeeHolidays />} />
          <Route path="/admin-holidays" element={<AdminHolidays />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </Router>
  );
}

export default App;
