import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom';

const adminLinks = [
    // { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Employees", path: "/admin/manage-employees" },
    { label: "Manage Departments", path: "/admin/manage-departments" },
    // { label: "Manage Designations", path: "/admin/manage-designations" },
    { label: "Manage Leaves", path: "/admin/manage-leave" },
    { label: "Manage Attendance", path: "/admin/manage-attendance" },
    // { label: "Settings", path: "/admin/settings" },
  ];

  
function AdminLayout() {
  return (
    <div className='flex'>
        <Sidebar links={adminLinks} title="Admin Panel"/>
        <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
          <Outlet />
        </main>
    </div>
  )
}

export default AdminLayout