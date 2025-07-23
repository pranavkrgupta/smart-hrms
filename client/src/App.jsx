import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Leave from "./pages/Employee/Leave";
import Settings from "./Pages/Employee/Settings";
import SalaryDetails from "./pages/Employee/SalaryDetails";
import HRMSDashboard from "./pages/Employee/SalaryDetails";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Employee/Leave" element={<Leave />} />
      <Route path="/Employee/Settings" element={<Settings />} />
      <Route path="/Employee/SalaryDetails" element={<SalaryDetails />} />
    </Routes>
  );
}

export default App;
