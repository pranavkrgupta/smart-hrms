import { Routes, Route, Navigate, replace } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import EmployeeLayout from "./layouts/EmployeeLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Employee/Dashboard";
import Leave from "./pages/Employee/Leave";
import Settings from "./pages/Employee/Settings";
import Profile from "./pages/Employee/Profile";
import Attendance from "./pages/Employee/Attendance";
import SalaryDetails from "./pages/Employee/SalaryDetails";
import ManageEmployees from "./pages/admin/ManageEmployee";
import LeaveManagement from "./pages/admin/LeaveManagement";
import AttendanceManagement from "./pages/admin/AttendanceManagement";
import ManageDepartments from "./pages/admin/ManageDepartment";
import ManageDesignation from "./pages/admin/ManageDesignation";
import AdminProfile from "./pages/admin/Profile";
import AdminSettings from "./pages/admin/Settings";
import AdminDashboard from "./pages/admin/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/PrivateRoute";
import ManageSalary from "./pages/admin/ManageSalary";
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Protected Admin Route */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="manage-leave" element={<LeaveManagement />} />
          <Route path="manage-attendance" element={<AttendanceManagement />} />
          <Route path="manage-employees" element={<ManageEmployees />} />
          <Route path="manage-departments" element={<ManageDepartments />} />
          <Route path="manage-designations" element={<ManageDesignation />} />
          <Route path="manage-salaries" element={<ManageSalary />} />
        </Route>
      </Route>
      {/* Protected Employee Route */}
      <Route element={<PrivateRoute allowedRoles={["ROLE_EMPLOYEE"]} />}>
        <Route path="/employee" element={<EmployeeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leave" element={<Leave />} />
          <Route path="settings" element={<Settings />} />
          <Route path="salaryDetails" element={<SalaryDetails />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />{" "}
    </Routes>
  );
}

export default App;
