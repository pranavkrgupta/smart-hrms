import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import Leave from './pages/Employee/Leave';
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Employee/Leave" element={<Leave />} />
    </Routes>
  )
}

export default App;
