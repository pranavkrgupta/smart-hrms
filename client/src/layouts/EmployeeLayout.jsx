import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const employeeLinks = [
    // { label: "Dashboard", path: "/employee/dashboard" },
    { label: "Leave", path: "/employee/leave" },
    { label: "Attendance", path: "/employee/attendance" },
    // { label: "My Profile", path: "/employee/profile" },
    { label: "My Salary", path: "/employee/salaryDetails" },
    { label: "Settings", path: "/employee/settings" },
  ];
function EmployeeLayout() {
  return (
    <div className="flex">
      <Sidebar links={employeeLinks} title="Employee Panel" />
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default EmployeeLayout