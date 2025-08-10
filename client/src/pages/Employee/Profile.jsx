import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../../services/employeeService"; // adjust path if needed
import { jwtDecode } from "jwt-decode";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get logged-in user ID from token
  const getLoggedInUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.userId; // make sure your token has userId
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = getLoggedInUserId();
        if (!userId) return;

        const response = await getEmployeeById(userId);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (!employee) {
    return <div className="text-center mt-10">No profile found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Employee Profile</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600">Full Name</p>
          <p className="font-semibold">{employee.name}</p>
        </div>
        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-semibold">{employee.email}</p>
        </div>
        <div>
          <p className="text-gray-600">Phone</p>
          <p className="font-semibold">{employee.phone}</p>
        </div>
        <div>
          <p className="text-gray-600">Department</p>
          <p className="font-semibold">{employee.departmentName}</p>
        </div>
        <div>
          <p className="text-gray-600">Designation</p>
          <p className="font-semibold">{employee.designationName}</p>
        </div>
        <div>
          <p className="text-gray-600">Joining Date</p>
          <p className="font-semibold">{new Date(employee.joiningDate).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
