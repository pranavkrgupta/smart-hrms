import { Route, Routes } from "react-router-dom";
import Settings from "./Pages/Employee/Settings";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Settings />} />
    </Routes>
  );
}

export default App;
