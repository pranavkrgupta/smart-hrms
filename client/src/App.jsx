import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Leave from "./pages/Employee/Leave";
import Settings from "./Pages/Employee/Settings";
import SalaryDetails from "./pages/Employee/SalaryDetails";

function App() {
  // Salary Data
  const salaryData = {
    basicSalary: 40000,
    hra: 7000,
    grossSalary: 48000,
    pfDeduction: 4800,
    netSalary: 43200,
  };
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Employee/Leave" element={<Leave />} />
      <Route path="/Employee/Settings" element={<Settings />} />
      // Passing salary Details as a Props
      <Route
        path="/Employee/SalaryDetails"
        element={<SalaryDetails {...salaryData} />}
      />
    </Routes>
  );
}

export default App;
