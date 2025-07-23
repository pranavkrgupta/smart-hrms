import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Leave from './pages/Employee/Leave';
import Settings from "./pages/Employee/Settings";
import Attendance from "./pages/Employee/Attendance"


function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Employee/Leave" element={<Leave />} />
      <Route path="/Employee/Settings" element={<Settings />} />
      <Route path="/Employee/SalaryDetails" element={<SalaryDetails />} />
      <Route path="/Employee/Attendance" element={<Attendance />} />
    </Routes>
  );
}

export default App;
