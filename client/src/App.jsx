// import { useState } from 'react'

import { Route, Routes } from "react-router-dom";
import Leave from './pages/Employee/Leave';
function App() {
  return (
    <Routes>
      <Route path="/Employee/Leave" element={<Leave />} />
    </Routes>
  );
}

export default App;