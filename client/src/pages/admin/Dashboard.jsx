import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const dashboardData = {
    totalEmployees: 154,
    totalDepartments: 5,
    totalDesignations: 12,
    todayAttendance: { present: 138, absent: 12 },
    pendingLeaveRequests: 4,
  };

  // Define labels with corresponding routes
  const quickActions = [
    { label: "Manage Employees", path: "/admin/manage-employees" },
    { label: "Manage Departments", path: "/admin/manage-departments" },
    { label: "Manage Designation", path: "/admin/manage-designations" },
    { label: "Manage Leaves", path: "/admin/manage-leave" },
    { label: "Manage Attendance", path: "/admin/manage-attendance" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  };
  return (
    <div className="flex flex-col w-full p-6 bg-white shadow-md rounded-md">
      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Dashboard Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm md:text-base mb-6">
        <p>
          <span className="font-semibold">Total Employees</span> :{" "}
          {dashboardData.totalEmployees}
        </p>
        <p>
          <span className="font-semibold">Total Departments</span> :{" "}
          {dashboardData.totalDepartments}
        </p>
        <p>
          <span className="font-semibold">Total Designation</span> :{" "}
          {dashboardData.totalDesignations}
        </p>
        <p>
          <span className="font-semibold">Today's Attendance</span> :{" "}
          {dashboardData.todayAttendance.present} Present /{" "}
          {dashboardData.todayAttendance.absent} Absent
        </p>
        <p>
          <span className="font-semibold">Pending Leave Request</span> :{" "}
          {dashboardData.pendingLeaveRequests}
        </p>
      </div>

      {/* Quick Actions Header */}
      <div className="border border-black text-center font-semibold py-1">
        QUICK ACTIONS
      </div>

      {/* Quick Action Buttons with Routing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {quickActions.map((action, index) => (
          <Link to={action.path} key={index}>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded shadow">
              {action.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
