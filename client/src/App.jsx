import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Leave from './pages/Employee/Leave';
import Settings from "./Pages/Employee/Settings";
import LeaveManagement from './pages/admin/LeaveManagement';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/manage-leave" element={<LeaveManagement />} />
      <Route path="/Employee/Leave" element={<Leave />} />
      <Route path="/Employee/Settings" element={<Settings />} />
    </Routes>
  )
}

export default App;
