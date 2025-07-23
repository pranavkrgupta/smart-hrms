function SalaryDetails({
  basicSalary = 4000,
  hra = 7000,
  grossSalary = 11000,
  pfDeduction = 1000,
  netSalary = 10000,
  onViewPayslips = 10000,
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-72">
        <div className="flex justify-between border p-2 mb-2">
          <strong>Basic Salary</strong>
          <span>{basicSalary}</span>
        </div>
        <div className="flex justify-between border p-2 mb-2">
          <strong>HRA</strong>
          <span>{hra}</span>
        </div>
        <div className="flex justify-between border p-2 mb-2">
          <strong>Gross Salary</strong>
          <span>{grossSalary}</span>
        </div>
        <div className="flex justify-between border p-2 mb-2">
          <strong>PF Deduction</strong>
          <span>{pfDeduction}</span>
        </div>
        <div className="flex justify-between border p-2 mb-4">
          <strong>Net Salary</strong>
          <span>{netSalary}</span>
        </div>
        <button
          className="w-full bg-blue-400 hover:bg-blue-500 text-black font-semibold py-2 rounded"
          onClick={onViewPayslips}
        >
          View Payslips
        </button>
      </div>
    </div>
  );
}

export default SalaryDetails;
