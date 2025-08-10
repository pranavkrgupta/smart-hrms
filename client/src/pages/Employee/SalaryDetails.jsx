import React, { useEffect, useState } from "react";
import { getSalaryByUser } from "../../services/salaryService";
import { jwtDecode } from "jwt-decode";

const EmployeeSalary = () => {
  const [salaryList, setSalaryList] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");

  // Fetch salaries for logged-in user
  const fetchSalary = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You are not logged in.");
        return;
      }

      const decoded = jwtDecode(token);
      setUserName(decoded.username || "Employee");

      const res = await getSalaryByUser();
      if (res.data && res.data.length > 0) {
        setSalaryList(res.data);
      } else {
        setMessage("No salary records found.");
      }
    } catch (err) {
      console.error("Error fetching salary:", err);
      setMessage("Failed to fetch salary records.");
    }
  };

  useEffect(() => {
    fetchSalary();
  }, []);

  // Download payslip for a salary record
  const downloadPayslip = (salary) => {
    const textContent = `
      Salary Payslip for: ${userName}
      -------------------------------------------
      Basic Salary: ${salary.amount}
      Gross Salary: ${salary.amount}
      PF Deduction: ${salary.pfDeduction || 0}
      Net Salary: ${salary.amount - (salary.pfDeduction || 0)}
      Applicable From: ${
        salary.applicableFrom
          ? new Date(salary.applicableFrom).toLocaleDateString()
          : "N/A"
      }
    `;

    const blob = new Blob([textContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Payslip_${salary.id}.txt`;
    link.click();
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-screen-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Your Salary Details</h1>

        {message && <p className="mb-4 text-blue-600">{message}</p>}

        {salaryList.length > 0 ? (
          <div className="space-y-6">
            {salaryList.map((salary) => (
              <div
                key={salary.id}
                className="p-6 border rounded-lg bg-gray-100 shadow-sm"
              >
                <p>
                  <strong>Basic Salary:</strong> {salary.amount}
                </p>
                <p>
                  <strong>Gross Salary:</strong> {salary.amount}
                </p>
                <p>
                  <strong>PF Deduction:</strong> {salary.pfDeduction || 0}
                </p>
                <p>
                  <strong>Net Salary:</strong>{" "}
                  {salary.amount - (salary.pfDeduction || 0)}
                </p>
                <p>
                  <strong>Applicable From:</strong>{" "}
                  {salary.applicableFrom
                    ? new Date(salary.applicableFrom).toLocaleDateString()
                    : "N/A"}
                </p>
                <button
                  onClick={() => downloadPayslip(salary)}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Download Payslip
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No salary records available.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeSalary;
