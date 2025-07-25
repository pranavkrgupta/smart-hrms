import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Leave from "./pages/Employee/Leave";
import Settings from "./pages/Employee/Settings";
import Attendance from "./pages/Employee/Attendance";
import SalaryDetails from "./pages/Employee/SalaryDetails";
import ManageEmployees from "./pages/admin/ManageEmployee";
import LeaveManagement from "./pages/admin/LeaveManagement";
import AttendanceManagement from "./pages/admin/AttendanceManagement";
import ManageDepartments from "./pages/admin/ManageDepartment";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import Dashboard from "./pages/Employee/Dashboard";
import AdminProfile from "./pages/admin/Profile";
import AdminSettings from "./pages/admin/Settings";
import AdminDashboard from "./pages/admin/Dashboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Admin Route */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="manage-leave" element={<LeaveManagement />} />
        <Route path="manage-attendance" element={<AttendanceManagement />} />
        <Route path="manage-employees" element={<ManageEmployees />} />
        <Route path="manage-departments" element={<ManageDepartments />} />
      </Route>

      {/* Employee Route */}
      <Route path="/employee" element={<EmployeeLayout />}>
        <Route path="leave" element={<Leave />} />
        <Route path="settings" element={<Settings />} />
        <Route path="salaryDetails" element={<SalaryDetails />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
