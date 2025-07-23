import React from "react";

function SalaryDetails() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-72">
        <div className="flex justify-between border p-2 mb-2">
          <strong>Basic Salary</strong>
          <span>40000</span>
        </div>
        <div className="flex justify-between border p-2 mb-2">
          <strong>HRA</strong>
          <span>8000</span>
        </div>
        <div className="flex justify-between border p-2 mb-2">
          <strong>Gross Salary</strong>
          <span>48000</span>
        </div>
        <div className="flex justify-between border p-2 mb-2">
          <strong>PF Deduction</strong>
          <span>4800</span>
        </div>
        <div className="flex justify-between border p-2 mb-4">
          <strong>Net Salary</strong>
          <span>43200</span>
        </div>
        <button className="w-full bg-blue-400 hover:bg-blue-500 text-black font-semibold py-2 rounded">
          View Payslips
        </button>
      </div>
    </div>
  );
}

export default SalaryDetails;
