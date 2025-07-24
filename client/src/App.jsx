import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Leave from './pages/Employee/Leave';
import Settings from "./pages/Employee/Settings";
import Attendance from "./pages/Employee/Attendance"
import SalaryDetails from "./pages/Employee/SalaryDetails"
import EmployeeProfile from "./pages/Employee/EmployeeProfile";
import ManageEmployees from './pages/admin/ManageEmployee';
import LeaveManagement from './pages/admin/LeaveManagement';
import AttendanceManagement from './pages/admin/AttendanceManagement';
import ManageDepartments from './pages/admin/ManageDepartment';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/manage-leave" element={<LeaveManagement />} />
      <Route path="/admin/manage-attendance" element={<AttendanceManagement />} />
      <Route path="/Employee/Leave" element={<Leave />} />
      <Route path="/Employee/Settings" element={<Settings />} />
      <Route path="/Employee/Profile" element={<EmployeeProfile />} />
      <Route path="/Employee/SalaryDetails" element={<SalaryDetails />} />
      <Route path="/Employee/Attendance" element={<Attendance />} />
      <Route path="/admin/manage-employees" element={<ManageEmployees />} />
      <Route path="/admin/manage-departments" element={<ManageDepartments />} />
    </Routes>
  );
}

export default App;
