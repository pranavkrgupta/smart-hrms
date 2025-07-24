import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Leave from "./pages/Employee/Leave";
import Settings from "./pages/Employee/Settings";
import Attendance from "./pages/Employee/Attendance"
import SalaryDetails from "./pages/Employee/SalaryDetails"
import ManageEmployees from './pages/admin/ManageEmployee';
import LeaveManagement from './pages/admin/LeaveManagement';
import AttendanceManagement from './pages/admin/AttendanceManagement';
import ManageDepartments from './pages/admin/ManageDepartment';
import ManageDesignation from './pages/admin/ManageDesignation';
import AdminLayout from './layouts/AdminLayout';
import EmployeeLayout from './layouts/EmployeeLayout';
import Profile from './pages/Employee/Profile';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Admin Route */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="manage-leave" element={<LeaveManagement />} />
        <Route path="manage-attendance" element={<AttendanceManagement />} />
        <Route path="manage-employees" element={<ManageEmployees />} />
        <Route path="manage-departments" element={<ManageDepartments />} />
          <Route path="manage-designations" element={<ManageDesignation />} />
      </Route>

      {/* Employee Route */}
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route path="leave" element={<Leave />} />
        <Route path="settings" element={<Settings />} />
        <Route path="salaryDetails" element={<SalaryDetails />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
  );
}

export default App;
