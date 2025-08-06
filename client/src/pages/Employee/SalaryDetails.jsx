import React, { useEffect, useState } from "react";
import axios from "axios";

// As of taken hard core values
const CURRENT_USER_ID = 9;
const API_BASE = "http://localhost:8080/api/salaries";

const SalaryTest = () => {
  const [salary, setSalary] = useState(null);
  // Only one salary record for the current user.
  const [message, setMessage] = useState("");

  // Load salary for the logged-in user
  const fetchSalary = async () => {
    try {
      const res = await axios.get(`${API_BASE}/${CURRENT_USER_ID}`);
      console.log("Salary Data:", res.data); // Debugging step
      if (res.data) {
        setSalary(res.data);
      } else {
        setMessage("No salary records found for this user.");
      }
    } catch (err) {
      console.error("Error fetching salary:", err);
      setMessage("Failed to fetch salary records.");
    }
  };

  useEffect(() => {
    fetchSalary();
  }, []);

  // Handle download of payslip as a text file
  const downloadTextFile = () => {
    // Create text content for the salary details including userName
    const textContent = `
      Salary Payslip for User : (${salary.userName})
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

    // Create a Blob from the text content
    const blob = new Blob([textContent], { type: "text/plain" });

    // Create a link to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Payslip_${CURRENT_USER_ID}.txt`; // Name the file dynamically based on user ID
    link.click(); // Trigger the download
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      <div className="max-w-screen-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Your Salary Details</h1>

        {message && <p className="mb-4 text-blue-600">{message}</p>}

        {salary ? (
          <>
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div className="p-6 border rounded-lg bg-gray-100">
                <p>
                  <strong className="text-lg">Basic Salary:</strong>{" "}
                  {salary.amount}
                </p>
                <p>
                  <strong className="text-lg">Gross Salary:</strong>{" "}
                  {salary.amount}
                </p>
                <p>
                  <strong className="text-lg">PF Deduction:</strong>{" "}
                  {salary.pfDeduction || 0}
                </p>
                <p>
                  <strong className="text-lg">Net Salary:</strong>{" "}
                  {salary.amount - (salary.pfDeduction || 0)}
                </p>
                <p>
                  <strong className="text-lg">Applicable From:</strong>{" "}
                  {salary.applicableFrom
                    ? new Date(salary.applicableFrom).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <button
                onClick={downloadTextFile}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-xl"
              >
                Download Payslip
              </button>
            </div>
          </>
        ) : (
          <p>No salary records found for this user.</p>
        )}
      </div>
    </div>
  );
};

export default SalaryTest;
